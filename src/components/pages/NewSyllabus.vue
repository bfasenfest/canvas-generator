<template>
  <div class="activity-page">
    <div class="code-container">
      <div class="textbox-container">
        <el-card class="card box-card uk-text-center">
            <el-button type="primary" class="top-button" @click="addProf">Add Professor</el-button>
            <el-button type="primary" class="top-button" @click="addTA">Add TA</el-button>
            <el-button type="danger" class="top-button" @click="clearTeachers">Clear</el-button>
        </el-card>

        <el-card class="card box-card" v-if="selected.list">
          <div slot="header" class="clearfix">
            <span class="big-text">Edit Info</span>

            <el-select v-model="selected" placeholder="Select" value-key="key" style="width: 180px; margin-left: 10px">
              <el-option-group
                key="profs"
                label="Professors">
                <el-option
                  v-for="(prof, index) in info.profs"
                  :key="prof.id"
                  :label="prof.name"
                  :value="{index, list: 'profs', key: prof.id}">
                </el-option>
              </el-option-group>
              <el-option-group
                v-if="info.tas.length > 0"
                key="tas"
                label="TAs">
                <el-option
                  v-for="(ta, index) in info.tas"
                  :key="ta.id"
                  :label="ta.name"
                  :value="{index, list: 'tas', key: ta.id}">
                </el-option>
              </el-option-group>
            </el-select>

            <el-button style="float: right; padding: 3px 0" type="text"@click="iEditable = !iEditable"> {{ iEditable ? "Save" : "Edit" }}</el-button>

          </div>
          <el-button style="float: right; margin-bottom: 10px;" type="danger" size="medium" @click="removeTeacher">Remove</el-button>

          <div v-show="iEditable" v-if="selected.list.length > 0" class="center">
            <el-input style="width: 200px; float:left" class="e-input" :value="info[selected.list][selected.index].name" @input="updateUser(info[selected.list][selected.index],'name', $event)"> </el-input>
            <el-alert
              title="An instructor email is not formatted correctly. Please change to the format of example@domain.com"
              type="error" class="alert" effect="dark" center show-icon
              v-show="invalidEmails">
            </el-alert>
            <el-input class="e-input" v-if="selected.list" :value="info[selected.list][selected.index].email" @input="updateUser(info[selected.list][selected.index],'email', $event)"> </el-input>
            <el-input class="e-input" v-if="selected.list" type="textarea" autosize :value="info[selected.list][selected.index].office" @input="updateUser(info[selected.list][selected.index],'office', $event)"> </el-input>
            <button type="button" name="button" class="uk-button-small uk-button-primary" @click="updateSwitch">{{userInput.uploadSwitchText}}</button> <br> <br>

            <!-- These forms upload the file or url to Amazon S3. More detail in the onFormSubmit method. -->
            <form name="file-form" v-show="this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('image', info[selected.list][selected.index])">
              <input name="image" id="image-file" type="file"> <br>
              <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
            </form>
            <form v-show="!this.userInput.isFile" v-if="selected.list" class="your-form-class" v-on:submit.prevent="onFormSubmit('url', info[selected.list][selected.index])">
              <input name="imageUrl" id="image-url" type="text" class="uk-input"> <br> <br>
              <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
            </form>
          </div>
        </el-card>

        <el-card class="card box-card">
          <div slot="header" class="clearfix">
            <span class="big-text">Edit Schedule Items</span>
          </div>
          <select v-model="userInput.weekNumber" class="uk-select">
            <option v-for="n in weeks.length" :value="n">{{info.classType.dateType}} {{n}}</option>
          </select>
          <div >
            <div class="uk-margin-small-top" v-if="weeks[userInput.weekNumber - 1]">
              <label>Title
              <el-input  style="width: 250px; margin: 10px; "  :value="weeks[userInput.weekNumber - 1].title" @input="updateWeek(userInput.weekNumber - 1,'title', $event)"> </el-input>
              </label>
            </div>
          </div>

          <div class="" v-if="weeks[userInput.weekNumber - 1]">
            <label >Date
            <el-date-picker
              style="margin: 10px; margin-bottom:20px"
              :value="weeks[userInput.weekNumber - 1].date"
              @input="updateWeek(userInput.weekNumber - 1,'date', $event)"
              type="date"
              placeholder="Pick start date">
            </el-date-picker>
            </label>
          </div>
          <div class="">
            Use Dates
            <el-switch
              :value="info.useDates"
              @input="updateProp('useDates', $event)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </el-card>


      </div>
      <div class='canvas-code'>
        <container-component cid="syllabus" :defaultRows="defRows"/>
      </div>
    </div>
  </div>

</template>

<script>
import ContainerComponent from '../common/ContainerComponent.vue'
import PageMixin from "../../components/mixins/page-mixin"
import RowTypes from '../../util/row-types.js'
import { mapActions } from "vuex"
import validator from "validator"


export default {
  name: "Syllabus",
  data() {
    return {
      userInput: {
        isFile: true,
        uploadSwitchText: "Click to Upload Image from Url",
        weekNumber: 1
      },
      pEditable: false,
      tEditable: false,
      iEditable: true,
      outputCode: "",
      selected: { index: 0, list: "profs" },
    }
  },
  components: {
    ContainerComponent
  },
  computed: {
    defRows(){
      return [
        [this.simpleBannerCol({banner: {getter: {title: 'info.title'}}})],
        [['instructor-list-slot']],
        [['spacer-slot']],
        'date-time-row',
        [this.syllabusComponentCol({title: {data: {title: 'Course Description'}}})],
        [this.syllabusComponentCol({title: {data: {title: 'Course Objectives'}}})],
        [this.syllabusComponentCol({title: {data: {title: 'Weekly Schedule'}}})],
        [['activity-table-slot']],
      ]
    },
    invalidEmails() {
      let invalidEmails = this.info.tas.filter (ta => !validator.isEmail(ta.email) || ta.email == "invalidemail@pleasereplace.com")
      invalidEmails += this.info.profs.filter (prof => !validator.isEmail(prof.email) || prof.email == "invalidemail@pleasereplace.com")
      console.log(invalidEmails)
      return invalidEmails.length > 0
    }
  },
  watch: {
    selected: function() {
      if (typeof this.selected.list !== "string") {
        this.selected.list = "profs"
      }
    }
  },
  mixins: [RowTypes, PageMixin],
  methods: {
    ...mapActions(["addProf", "addTA", "deleteTA", "deleteProf"]),

    formatDate(date) {
      return moment(date).format("MMMM Do")
    },
    newLine(val) {
      if (!val) return ""
      return val.replace(/\r?\n/g, "<br />")
    },
    updateSwitch() {
      this.userInput.isFile = !this.userInput.isFile
      this.userInput.uploadSwitchText = this.userInput.isFile
        ? "Click to Upload Image from URL"
        : "Click to Upload Image from Computer"
    },
    onFormSubmit(type, obj, id = type == "url" ? "#image-url" : "#image-file", ev) {
      var formData = new FormData()

      if (type == "url") {
        console.log("uploading url...")
        var imageurl = document.querySelector(id) // Gets form data in html
        if (imageurl.value == "") return
        formData.append("imageUrl", imageurl.value) // Adds api header to tell server that it is a url
      } else {
        console.log("uploading file...")
        var imagefile = document.querySelector(id)
        if (imagefile.files.length == 0) return
        formData.append("image", imagefile.files[0]) // Adds api header to tell server that it is a file
      }

      // More api headers to tell the server the dimensions to crop
      formData.append("imageWidth", 200)
      formData.append("imageHeight", 200)

      // Send post request to Amazon server using vue-resource with form data
      this.$http.post("https://images.columbiacoursebuilder.org/image", formData).then(
        response => {
          console.log("success")
          let imageData = JSON.parse(response.bodyText)
          obj.imgSrc = imageData.imageUrls[0] // Change requisite weekly activity image src to the hosted file
        },
        response => {
          console.log(response)
        }
      )
    },
    addProf() {

      this.$store.dispatch("addProf")
      let index = this.info.profs.length - 1
      this.selected = { index, list: "profs", key: this.info.profs[index].id }

    },
    addTA() {

      this.$store.dispatch("addTA")
      let index = this.info.tas.length - 1
      this.selected = { index, list: "tas", key: this.info.tas[index].id }

    },
    removeTeacher() {

      let { list, index } = this.selected
      let user = this.info[list][index]
      
      if (this.info[list].length == 1) {
        if (list == "profs") {
          console.log('first prof')
          return
        }
        this.selected = { index: 0, list: "profs", key: this.info.profs[0].id }
      } else {
        let newIndex = Math.abs(index - 1)
        let firstIndex = index - 1 == -1 ? 0 : newIndex
        this.selected = { index: firstIndex, list, key: this.info[list][newIndex].id }
      }

      if (list == "profs") this.deleteProf(user)
      else this.deleteTA(user)
    },

    clearTeachers() {
      this.info.tas.forEach(ta => {
        this.deleteTA(ta)
      })
      this.info.profs.forEach((prof, index) => {
        if (index > 0) this.deleteProf(prof)
      })
      this.selected = { index: 0, list: "profs", key: this.info.profs[0].id }
    },

    setToDefault() {
      console.log("resetting data...")
      let dInfo = _.cloneDeep(this.$store.getters.getDInfo)
      let props = ["profs", "tas"]

      props.forEach(prop => {
        this.updateProp(prop, dInfo[prop])
      })
    },

    getSaveStateConfig() {
      return {
        cacheKey: "Syllabus"
      }
    }
  },
  mounted(){
  }
}
</script>

<style scoped lang="scss">
.big-text {
  font-size: 1.2rem;
}

.box-card {
  width: 380px;
}

.card {
  margin: 10px;
}

.e-input {
  margin: 5px;
}

.code-module {
  margin-left: 20%;
  margin-right: 20%;
}

.show-editor {
  height: 40px;
  margin-bottom: 10px;
  margin-left: 30%;
  margin-right: 30%;
}

.edit-button {
  margin-right: 10px;
  margin-left: auto;
  float: right;
}



.code-input {
  margin: 10px;
}

#canvas-code {
  width: 1090px;
  margin: auto;
  margin-bottom: auto;
  align-self: flex-start;
}




.code-container {
  transition: all 0.5s ease;
  display: block;

  .textbox-container {
    width: 40%;
    margin-top: 0;
    position: sticky;
    display: inline-block;
    top: 16px;
    vertical-align: top;
    max-width: calc(100% - 1080px);

    .box-card {
        max-width: 500px;
        margin: 10px auto;
    }
  }

  .canvas-code {
    display: inline-block;
  }
}

.top-button{
  margin-left: -5px;
  margin-right: -5px;

}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
