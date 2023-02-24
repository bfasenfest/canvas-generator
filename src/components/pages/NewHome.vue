<template>
  <div class="home-page">
    <div id="top-controls" >
      <!-- This Div contains all of the information inputs -->
      <!-- Currently it uses a component from the Element UI library for the tabs -->

      <div class="clearfix"></div>

      <!-- Popover Tips -->

      <el-popover
      ref="titlepop" placement="top-start"
      title="Course Title" width="300"
      trigger="hover" :open-delay=2000
      content="The course title should be below 30-40 characters to properly fit on the banner"
      :disabled="!info.usePops">
      </el-popover>

      <el-popover
      ref="urlpop" placement="top-start"
      title="Course URL" width="300"
      trigger="hover" :open-delay=2000
      :disabled="!info.usePops"
      content="The course url is necessary to properly link other pages to your canvas site. Please double check it is correct before copying to canvas.">
      </el-popover>

      <div>
        <ul class="uk-tab uk-flex-center" data-uk-tab="{connect:'#tab-content'}">
          <li class="uk-active"><a href="#">Course Info</a></li>
          <li><a href="#">instructors</a></li>
          <li><a href="#">Meeting Times</a></li>
          <li><a href="#">Banner</a></li>
        </ul>
        <ul id="tab-content" class="uk-switcher uk-margin">
          <li class="uk-active uk-text-center">

            <!-- Alerts based on validation of course title and url -->
            <el-alert
              title="Course Info Incomplete" effect="dark"
              type="warning" class="alert" show-icon center
              description="The course title or course URL are currently empty or not valid. Please complete these sections to continue."
              v-show="!checkTitle">
            </el-alert>
            <el-alert
              title="The length of the course title is longer than 35 characters and may not display properly. Please change the title."
              type="warning" class="alert" center show-icon
              v-show="info.title.length > 35 && !info.wideBanner">
            </el-alert>


            <el-input style="width: 220px;" v-popover:titlepop placeholder="Please input your Course Title" :value="info.title" @input="updateProp('title', $event)"></el-input>

            <el-input title="This is your Course ID" style="width: 200px;" :value="info.semester" @input="updateProp('semester', $event)" v-tippy="{delay: [1000,200]}"></el-input>
            <el-input style="width: 400px;" v-popover:urlpop placeholder="Please input your Course URL"  :value="info.url" @input="updateProp('url', $event)"></el-input>

          </li>

          <li class="uk-text-center">
            <el-alert
              title="An instructor email is not formatted correctly. Please change to the format of example@domain.com"
              type="error" class="alert" effect="dark" :closable="false" center show-icon
              v-show="invalidEmails">
            </el-alert>
            <div v-for="prof in info.profs" :key="prof.id">
            <el-input autosize :value="prof.name" style="width: 150px;" @input="updateUser(prof, 'name', $event)"></el-input>
            <el-input autosize :value="prof.email" style="width: 250px;" @input="updateUser(prof, 'email', $event)"></el-input>
            <el-input autosize :value="prof.office" style="width: 400px;" @input="updateUser(prof, 'office', $event)"></el-input> <br>
            </div>
            <hr>
            <span v-if="info.tas.length > 0">
              <div v-for="ta in info.tas" :key="ta.id">
                <el-input autosize :value="ta.name" style="width: 150px;" @input="updateUser(ta, 'name', $event)"></el-input>
                <el-input autosize :value="ta.email" style="width: 250px;" @input="updateUser(ta, 'email', $event)"></el-input>
                <el-input autosize :value="ta.office" style="width: 400px;" @input="updateUser(ta, 'office', $event)"></el-input> <br>
              </div>
            </span>
          </li>

          <li class="uk-text-center">
            <el-input autosize style="width: 400px;" :value="info.meetings" @input="updateProp('meetings', $event)"></el-input>
            <el-input autosize style="width: 400px;" :value="info.discussions" @input="updateProp('discussions', $event)"></el-input> <br>
          </li>

          <li class="uk-text-center">
            <label>
              Banner Image:
              <select style="display: inline-block; width:150px" v-model="theme" name="Choose Banner" class="uk-select">
                <option selected disabled>Choose Banner</option>
                <option v-for="theme in themeOptions" :value="theme" :key="theme.option">{{theme.option}}</option>
              </select>

                <!-- <el-checkbox v-if="theme.wide" v-model="info.wideBanner" @input="updateProp('wideBanner', $event)" >Use Wide Banner</el-checkbox> -->
            </label>

          </li>
        </ul>
      </div>

      <hr />
    </div>
    <container-component cid="home" :defaultRows="homeLayout"/>
  </div>

</template>

<script>
import _ from 'lodash'

import ContainerComponent from '../common/ContainerComponent.vue'
import validator from "validator"

import RowTypes from '../../util/row-types.js'
import PageMixin from "../../components/mixins/page-mixin"


export default {
  name: "Home",
  data() {
    return {
      userInput: {
        themeOptions: this.$store.getters.getThemeOptions,
        isVideo: false,
        mediaSwitchText: "Toggle to input Video"
      },
      activeName: "1",
      outputCode: "",
      homeLayout: [
        'home-banner-row',
        [['image-slot'], 'home-sidebar'],
        'home-instructors-row',
        'date-time-row',
      ],
    }
  },
  components: {
    ContainerComponent
  },
  mixins: [RowTypes, PageMixin],
  methods: {
  },
  computed: {
    checkTitle() {
      if (this.info.title.length < 1 || this.info.url.length < 1) return false
      return validator.isURL(this.info.url)
    },
    invalidEmails() {
      let invalidEmails = this.info.tas.filter (ta => !validator.isEmail(ta.email) || ta.email == "invalidemail@pleasereplace.com")
      invalidEmails += this.info.profs.filter (prof => !validator.isEmail(prof.email) || prof.email == "invalidemail@pleasereplace.com")
      console.log(invalidEmails)
      return invalidEmails.length > 0
    },
    weeklyUrl() {
      let ending = "pages/activities"
      return this.info.url + ending
    },
    themeOptions(){
      // return this.themeOptions
      if (this.Config.themes.visible == '*'){
        return _.pickBy(this.defaultOptions, (theme, key) => {
          return !_.includes(this.Config.themes.hidden, theme.option)
        })
      }
      else {
        return _.pickBy(this.defaultOptions, (theme, key) => {
          return _.includes(this.Config.themes.visible, theme.option)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
el-tab-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: "blue";
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.alert {
  width: 50%;
  margin: auto;
  text-align: center;
  margin-bottom: 10px;
}

.textbox {
  margin-left: 40px;
}
</style>
