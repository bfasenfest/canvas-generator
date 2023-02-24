<template>

  <div id="weeklylist">

  <hr>
  
  <div id="case-slide" uk-offcanvas="">
    <div class="uk-offcanvas-bar home-bar">
      <button class="uk-offcanvas-close" type="button" uk-close></button>
      <h3>Add Case</h3>

      <div class="STV1_SlimBanner">
        <p>PICKER CENTER CASE COLLECTION</p>
      </div>

      <div v-for="category in getCases" :key="category.category">
      <div class="pad-box-mini">
        <h3 style="margin-bottom: 15px;"><i class="icon-folder"></i> {{category.category}}</h3>
      </div>

      <div v-for="caseStudy in category.cases" class="content-box" :key="caseStudy.id">
        <div class="grid-row top-xs">
          <div class="col-xs-4">
            <div class="styleguide-section__grid-demo-element">
              <a @click="addCase(caseStudy)">
                 <img class="weeklyIconImg" :src="caseStudy.thumbnail"/> </a>
            </div>
          </div>
          <div class="col-xs-8">
            <div class="styleguide-section__grid-demo-element">
              <div v-if="caseStudy.name.length < 30" class="welcome" style="height:50px;"><i class="icon-search"></i>&nbsp;{{caseStudy.name}} 
              <el-button @click="removeCase(caseStudy)" size="small" type="danger" style="float: right;">Remove Case</el-button>
              <el-button @click="addCase(caseStudy)" size="small" type="success" style="float: right; margin-right: 5px">Add Case</el-button></div>
              <div v-else class="welcome" style="height:75px;"><i class="icon-search"></i>&nbsp;{{caseStudy.name}} 
              <el-button @click="removeCase(caseStudy)" size="small" type="danger" style="float: right; margin-top: 5px">Remove Case</el-button>
              <el-button @click="addCase(caseStudy)" size="small" type="success" style="float: right; margin-top: 5px; margin-right: 5px">Add Case</el-button></div>
              <p>{{caseStudy.shortDescription}}</p>
            </div>
          </div>
        </div>
      </div>

      </div>
      
    </div>
  </div>

  <div class="code-container">
    
    <div class="textbox-container">

        <el-select v-model="selected" placeholder="Select" style="width: 150px; margin-left: 12vw; margin-right:12vw; margin-bottom: 15px;" class="input-element">
        <el-option
          v-for="(week, index) in weeks"
          :label="info.classType.dateType + ' ' + (index + 1)"
          :value="index" :key="week.id">
        </el-option>
        </el-select>


     <div class=" input-element">
      <el-input autosize class="code-inputt" style="width: 300px; margin-bottom: 15px;" placeholder="Please input week title" :value="weeks[selected].title"
        @input="updateWeek(selected,'title', $event)"></el-input> 
      </div>

      <!-- <button type="button" name="button" class="uk-button uk-button-primary" @click="setToDefault">Reset to Default</button> -->
      <el-button type="primary" name="button" size="large" class="show-editor center" @click="showEditor = !showEditor" >{{showEditor ? "Hide Text Editor" : "Show Text Editor"}}</el-button>
      <hr>
      <!-- This transition is defined as a css animations in the style section -->
      <transition name="fade"></transition>
      <div v-show="showEditor">

        <!-- Alert to warn about how to edit the table -->
        <el-alert
          title="Edit Readings and Lecture Presentation table directly in Canvas" type="warning"
          show-icon style="width:80%; margin:auto; margin-bottom: 10px" justify="center">
        </el-alert>

        <div class="quill">
          <quill-editor ref="myTextEditor"
                        :value="weeks[selected].body"
                        @input="updateWeek(selected,'body', $event)"
                        :config="editorOption">
          </quill-editor>

          <!-- <ckeditor :editor="editor" @input="updateWeek(selected,'body', $event)" :value="weeks[selected].body" :config="editorConfig"></ckeditor> -->
        </div>

        <!-- <div class="quill">
          <quill-editor ref="myTextEditor"
                        v-model="weeks[selected].required"
                        :config="editorOption">
          </quill-editor>
        </div> -->
      <br>
      </div>
      <!-- </transition> -->
      <div style="margin-top: 10px;"><br> <hr></div>


      <!-- This is a seperate component to handle adding new Acitivity Page elements abstractly. For more information check the WeeklyCodeModule.vue file. -->
      <weekly-code-module
        class="code-module"
        :content="weeks[selected].videos"
        property='videos'
        :idx="selected"
        :fn="addVideo"
        :inputs="['title','description', 'source']"
        @clearArr="updateWeek(selected,'videos', [])">
        Video
      </weekly-code-module>

      <weekly-code-module
        class="code-module"
        :content="weeks[selected].discussions"
        property='discussions'
        :idx="selected"
        :fn="addDiscussion"
        :inputs="['due']"
        @clearArr="updateWeek(selected,'discussions', [])">
        Discussion
      </weekly-code-module>

      <weekly-code-module
        class="code-module"
        :content="weeks[selected].assignments"
        property='assignments'
        :idx="selected"
        :fn="addAssignment"
        :inputs="['due']"
        @clearArr="updateWeek(selected,'assignments', [])">
        Assignment
      </weekly-code-module>
      <div style="margin-left= 12vw; margin-right=12vw;">
      <a href="#case-slide" uk-toggle>
        <el-button  class="center" size="large" style=" margin-right: 10px"> Add Case <i class="fas fa-info-circle"></i></el-button>
      </a>
        <el-button  @click="updateWeek(selected,'cases', [])" class="center" size="large" type="danger" style=""> Clear Cases <i class="fas fa-trash"></i></el-button>
      </div>

    </div>

    <!-- Where the canvas code is stored -->
    <div id="week-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain canvas-code'>
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]"  style="width: 1054px;">
        <p>{{info.title.toUpperCase()}}</p>
      </div>
      <div class="grid-row">
        <div class="col-xs-12 col-lg-12">
          <div class="ic-image-text-combo">
            <div class="ic-image-text-combo__text">
              <div class="pad-box-mini">
                <h3 style="margin-bottom: 5px;">
                  <i class="icon-clock"></i> {{info.classType.dateType}} {{selected + 1}}: {{weeks[selected].title}}</h3>
                </div>
                <div class="pad-box-mini border border-b border-t">
                  <p v-html="weeks[selected].body"></p>
                  <!-- <div class="pad-box-mini">
                    <span v-html="weeks[selected].required" >
                    </span>
                  </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- The videos, discussions, and assignments are all built into their own smaller components to keep it more organized
      They are WeeklyDiscussion.vue, WeeklyAssignment.vue, and WeeklyVideo.vue respectively. -->


      <weekly-video  v-for="(video, index) in weeks[selected].videos" :data="video" :index="index+1" :key="video.source"> </weekly-video>



    <transition name="fade">
      <div  v-if="weeks[selected].cases.length > 0">

        <div v-for="caseStudy in weeks[selected].cases" :key="caseStudy.id">
        <div class="STV1_SlimBanner">
          <p>PICKER CENTER CASE COLLECTION</p>
        </div>
        <div class="content-box">
          <div class="grid-row">
            <div class="col-xs-12 col-md-12 col-lg-6">
              <div class="styleguide-section__grid-demo-element">
                <div class="embed-container"><iframe :src="caseStudy.videoCase" width="300" height="150"
                    allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen"
                    mozallowfullscreen="mozallowfullscreen"></iframe></div>
              </div>
            </div>
            <div class="col-xs-12 col-md-12 col-lg-6">
              <div class="styleguide-section__grid-demo-element">
                <h3 style="margin-bottom: 5px; margin-top: 0;"><i class="icon-folder"></i>&nbsp;{{caseStudy.name}}</h3>
                <p>{{caseStudy.description}}</p>
               <a class="instructure_file_link instructure_scribd_file" title="Case Study"
                    :href="caseStudy.writtenCase"
                    :data-api-endpoint="caseStudy.writtenCase"
                    data-api-returntype="File"><button>Case Study Document</button></a> <a class="instructure_file_link instructure_scribd_file"
                    title="Original Documents"
                    :href="caseStudy.originalDocuments"
                    :data-api-endpoint="caseStudy.originalDocuments"
                    data-api-returntype="File"><button>Original Documents</button></a> <a class="instructure_file_link instructure_scribd_file"
                    title="Transcripts"
                    :href="caseStudy.transcripts"
                    :data-api-endpoint="caseStudy.transcripts"
                    data-api-returntype="File"><button>Transcripts</button></a>
              </div>
            </div>
          </div>
        </div>
        <div v-if="caseStudy.aditionalInterviews.length > 0">
        <div class="content-box">
          <div class="grid-row">
            <div class="col-xs-12 col-lg-12">
              <div class="styleguide-section__grid-demo-element">
                <div class="STV1_Welcome">ADDITIONAL INTERVIEWS</div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-box">
          <div class="grid-row">
            <div class="col-xs-12 col-lg-4" v-for="interview in caseStudy.aditionalInterviews" :key="interview">
              <div class="styleguide-section__grid-demo-element">
                <div class="embed-container"><iframe :src="interview" width="300" height="150"
                    allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen"
                    mozallowfullscreen="mozallowfullscreen"></iframe></div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="item-group-container" style="padding-bottom: 0;" v-if="weeks[selected].assignments.length > 0 || weeks[selected].discussions.length > 0">
        <div class="item-group-condensed">
          <ul id="cond_group_1" class="ig-list">
          <weekly-discussion  v-for="(disc, index) in weeks[selected].discussions" :data="disc" :index="index+1" :key="disc.id"> </weekly-discussion>
          <weekly-assignment  v-for="(assign, index) in weeks[selected].assignments" :data="assign" :index="index+1" :key="assign.id"> </weekly-assignment>
          </ul>
        </div>
      </div>
    </transition>

    </div>

  </div>

  <div class="uk-float-right">
    <a class="uk-button uk-button-primary" href="#modal-overflow" uk-toggle>View the Code</a>
    <button class="uk-button uk-button-primary" @click="copyText({elem:'aux', div: 'week-code'})">Copy the Code</button>
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
import { quillEditor } from "vue-quill-editor"
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import WeeklyCodeModule from "../weekly/WeeklyCodeModule.vue"
import WeeklyVideo from "../weekly/WeeklyVideo.vue"
import WeeklyDiscussion from "../weekly/WeeklyDiscussion.vue"
import WeeklyAssignment from "../weekly/WeeklyAssignment.vue"
// import saveState from "vue-save-state"
// import Home from "./Home"
import moment from "moment"

var toolbarOptions = [
  ["bold", "italic", "underline"],
  [
    "blockquote",
    {
      list: "ordered"
    },
    {
      list: "bullet"
    }
  ],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ script: "sub" }, { script: "super" }],
  ["link", "clean"]
]

export default {
  name: "weekly",
  data() {
    return {
      userInput: {
        videoNumber: 1,
        weekTitle: "WEEK 1: Sustainable Agriculture and Food Systems: Key Concepts and Historical Perspective",
        description:
          "We will begin with an overview of the course objectives and content, the methods of instruction, the assignments, and the grading system. We will then present and discuss “The Big Picture,” starting with the historical context of the current global food system, including the “Green Revolution.” Which institutions have shaped and will shape global food systems? We will briefly discuss the concept of Sustainable Intensification. We will also consider the recently agreed SDGs and how they could contribute to more sustainable and equitable global food systems. And we will discuss some of the forces shaping food systems around the world.",
        required:
          '<span ><p><strong>Lecture Slides:</strong></p><p><strong>Download PDF:&nbsp;</strong><a href="https://courseworks2.columbia.edu/courses/29191/files/1032282/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">GFS Week 6 Africa (February 21, 2017) Final.pdf<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></p><p><strong>Required Readings / Viewings:</strong></p><ul><li>Sanchez, P.A. (2002) Soil fertility and hunger in Africa.&nbsp;<em>Science&nbsp;</em><strong>295</strong>: 2019-2020.</li><li>Download PDF:&nbsp;<a href="https://courseworks2.columbia.edu/courses/29191/files/929036/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">Soil_Fertility_and_Hunger_in_Africa_2002.pdf<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></li><li><strong>Familiarize yourself with the work of the Alliance for an African Green Revolution (AGRA):&nbsp;</strong><a href="http://www.agra.org/" target="_blank" style="color: rgb(0, 142, 226);">http://www.agra.org/&nbsp;(Links to an external site.)</a></li></ul><p><strong>Supplementary Resources</strong></p><ul><li>Listen: --“African Land Fertile Ground for Crops and Investors.” NPR. June 15, 2012.&nbsp;<a href="http://www.npr.org/2012/06/15/155095598/african-land-fertile-ground-for-crops-and-investors" target="_blank" style="color: rgb(0, 142, 226);">http://www.npr.org/2012/06/15/155095598/african-land-fertile-ground-for-crops-and-investors&nbsp;(Links to an external site.)</a></li><li>Download mp3:&nbsp;<a href="https://courseworks2.columbia.edu/courses/29191/files/1009373/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">20120615_atc_06.mp3<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></li></ul></span>'
      },
      selected: 0,
      videoEditable: false,
      showEditor: false,
      videos: [],
      discussions: [],
      assignments: [],
      outputCode: "",
      // editor: ClassicEditor,
      editorConfig: {},
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    quillEditor,
    WeeklyVideo,
    WeeklyCodeModule,
    WeeklyDiscussion,
    WeeklyAssignment
  },
  mixins: [PageMixin],
  computed: {
    ...mapGetters(["getInfo", "getDWeek", "getWeeks", "getCases"]),
    caseOptions() {
      let cases = this.getCases
      let options = []

      cases.forEach(function(category, i) {
        options[i] = {
          value: category.category,
          label: category.category,
          children: []
        }

        category.cases.forEach(function(caseChild, j) {
          options[i].children[j] = {
            value: caseChild.name,
            label: caseChild.name
          }
        })
      })

      return options
    }
  },
  methods: {

    addCase(caseStudy) {
      let index = this.selected
      this.$store.dispatch("addCase", {index, caseStudy})
    },

    removeCase(caseStudy) {
      let index = this.selected
      this.$store.dispatch("removeCase", {index, caseStudy})
    },

    addVideo() {
       let index = this.selected
       this.$store.dispatch("addVideo", {index})
    },

    addDiscussion() {
      let tempDisc = {
        link: "%24CANVAS_OBJECT_REFERENCE%24/discussion_topics/" + "ccb-session-" + (this.selected + 1) + "-disccusion-" + (this.weeks[this.selected].discussions.length + 1),
        due: moment(this.weeks[this.selected].date).add(7, "d"),
      }
      console.log(tempDisc)
      this.$store.dispatch("addDiscussion", {index:this.selected, data: tempDisc})
    },

    addAssignment() {
      let tempAssign = {
        link: "%24CANVAS_OBJECT_REFERENCE%24/assignments/" + "ccb-session-" + (this.selected + 1) + "-disccusion-" + (this.weeks[this.selected].discussions.length + 1),
        due: moment(this.weeks[this.selected].date).add(7, "d"),
      }
      this.$store.dispatch("addAssignment", {index:this.selected, data: tempAssign})
    },

    setToDefault() {
      console.log("resetting data...")
      let dWeek = _.cloneDeep(this.$store.getters.getDWeek)
      let props = ["description", "title", "body", "required", "videos", "discussions", "assignments", "cases"]

      props.forEach(prop => {
        this.updateWeek(this.selected, prop, dWeek[prop])
      })
    },
    getSaveStateConfig() {
      return {
        cacheKey: "Weekly"
      }
    }
  },
  mounted() {
    this.weeks.forEach(week => {
      if (!week.cases) week.cases = []
    })
    this.updateCode("week-code")
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
  width: 1090px;
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
