<template>

  <div id="weeklylist">

  <hr>
  

  <div class="code-container">
    
    <div class="textbox-container">

      <div class="code-input center uk-margin-small-top">
        <label for="text-area">Zoom Link</label> <br>
        <el-input type="textarea" autosize :value="info.zoomLink"
        @input="updateProp('zoomLink', $event)"> </el-input>
      </div>

    </div>

    <!-- Where the canvas code is stored -->
    <div id="zoom-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain canvas-code'>
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]"  style="width: 1054px;">
        <p>{{info.title.toUpperCase()}}</p>
      </div>
     
      <div class="content-box">
      <div class="grid-row">
      <div class="col-xs-12 col-lg-12">
      <div class="ic-image-text-combo">
      <div class="ic-image-text-combo__text">
      <div class="pad-box-mini">
      <h3 style="margin-bottom: 5px;"><i class="icon-group"></i> Zoom Web-Conferencing Collaboration</h3>
      </div>
      <div class="pad-box-mini border border-b border-t">
      <p>Using ZOOM technology, students are able to interact with classmates to discuss and collaborate. Please review the <a class="instructure_file_link instructure_scribd_file" title="Zoom Student Guide - 08.26.16.pdf" href="https://sipa-canvas.s3.us-east-2.amazonaws.com/documents/A1.+Zoom+Student+Guide+-+EMPA.pdf" data-api-returntype="File">Zoom Student Guide</a> and visit <a href="https://zoom.us/">zoom.us</a> to download the desktop client and create a free account.</p>
      <p>Please mute your accounts when joining live streaming zoom sessions.</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div class="content-box">
      <div class="item-group-container" style="padding-bottom: 0;">
      <div class="item-group-condensed">
      <ul id="cond_group_1" class="ig-list">
      <li>
      <div class="ig-row">
      <div class="ig-row__layout">
      <div class="ig-type-icon" aria-hidden="true"> <i class="icon-group" /> </div>
      <div class="ig-info"><a class="ig-title" :href="info.zoomLink" target="_blank" rel="noopener"> LAUNCH ZOOM SESSION</a><a class="ig-title" href="#" target="_blank" rel="noopener"></a></div>
      </div>
      </div>
      </li>
      <li v-for="(week, index) in weeks" :key="week.id">
      <div class="ig-row">
      <div class="ig-row__layout">
      <div class="ig-type-icon" aria-hidden="true"><i class="icon-group" /> </div>
      <div class="ig-info"><a href=""> Class Session {{index+1}} Recording</a></div>
      </div>
      </div>
      </li>



      </ul>
      </div>
      </div>
      </div>


   
    </div>

  </div>

  <div class="uk-float-right">
    <a class="uk-button uk-button-primary" href="#modal-overflow" uk-toggle>View the Code</a>
    <button class="uk-button uk-button-primary" @click="copyText({elem:'aux', div: 'zoom-code'})">Copy the Code</button>
    <button class="uk-button uk-button-danger" @click="setToDefault">Reset to Default</button>
  </div>

  <div id="modal-overflow" uk-modal>
      <div class="uk-modal-dialog">

          <button class="uk-modal-close-default" type="button" uk-close></button>

          <div class="uk-modal-header">
              <h2 class="uk-modal-title">Canvas Code</h2>
          </div>

          <div class="uk-modal-body" uk-overflow-auto>
            <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea>
          </div>

          <div class="uk-modal-footer uk-text-right">
              <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
              <button class="uk-button uk-button-primary" type="button" @click="copyText">Copy Code</button>
          </div>

      </div>
  </div>
  
  <!-- <p style="font-weight: bold" class="center">Code Output</p>

  <div class="footer">
    <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea> <br> <br>
  </div> -->

</div>
</template>

<script>
import { mapGetters } from "vuex"
import PageMixin from "../../components/mixins/page-mixin"
import saveState from "vue-save-state"
import moment from "moment"

export default {
  name: "zoom",
  data() {
    return {}
  },
  components: {},
  mixins: [PageMixin],
  computed: {
    ...mapGetters(["getInfo", "getDWeek", "getWeeks"])
  },
  methods: {
    setToDefault() {
      console.log("resetting data...")
      let dInfo = _.cloneDeep(this.$store.getters.getDInfo)
      let props = ["zoomLink"]

      props.forEach(prop => {
        this.updateProp(prop, dInfo[prop])
      })
    },
    getSaveStateConfig() {
      return {
        cacheKey: "Zoom"
      }
    }
  },
  mounted() {
    this.weeks.forEach(week => {
      if (!week.cases) week.cases = []
    })
    this.updateCode("zoom-code")
  },
  beforeUpdate() {}
}
</script>



<style scoped>
h1,
h2 {
  font-weight: normal;
}

textarea {
  width: auto;
}

.home-bar {
  width: 50vw;
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

.textbox-container {
  width: 40%;
  margin-top: 20px;
}

.input-element {
  clear: both;
  display: block;
}

.code-input {
  margin: 10px;
}

.quill {
  width: 80%;
  margin-bottom: 25px;
  margin: auto;
}

#canvas-code {
  width: 1015px;
  margin: auto;
  margin-bottom: auto;
  align-self: flex-start;
}

.code-container {
  transition: all 0.5s ease;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

#copy-text-area {
  width: 80%;
  height: 200px;
}

.GFbanner {
  height: 190px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

 {
  opacity: 0;
}
</style>
