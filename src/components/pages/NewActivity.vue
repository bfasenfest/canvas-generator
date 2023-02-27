<template>
  <div class="activity-page">
    <div class="code-container">
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
              <div style="float: right; margin-right: 5px">
              <el-button @click="addCase(caseStudy)" size="small" type="success" style="margin-right: -10px">Add Case</el-button>
              <el-button @click="removeCase(caseStudy)" size="small" type="danger" >Remove Case</el-button>
              </div></div>
              <div v-else class="welcome" style="height:75px;"><i class="icon-search"></i>&nbsp;{{caseStudy.name}}
              <div style="float: right; margin-right: 5px">
                <el-button @click="addCase(caseStudy)" size="small" type="success" style="margin-right: -10px">Add Case</el-button>
                <el-button @click="removeCase(caseStudy)" size="small" type="danger" >Remove Case</el-button>
                </div>
              </div>
              <p>{{caseStudy.shortDescription}}</p>
            </div>
          </div>
        </div>
      </div>

      </div>

    </div>
  </div>


    <div class="textbox-container">
      <el-card class="card box-card">
        <div class="uk-text-center">
          <router-link
          to="/activities" >
          <el-button type="success" size="medium">Return To Activity List</el-button>
          </router-link>
        </div>
        <br>
        <div class="uk-text-center">
        <el-select  :value="getSelectedWeekID" @input="setStateField({field: 'selectedWeekID', value: $event})"
        placeholder="Select"
        >
        <el-option
          v-for="(week, index) in weeks"
          :label="info.classType.dateType + ' ' + (index + 1)"
          :value="week.id" :key="week.id">
        </el-option>
        </el-select>
        </div>

        <hr>


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

      <weekly-code-module
        class="code-module"
        :content="weeks[selected].quizes"
        property='quizes'
        :idx="selected"
        :fn="addQuiz"
        :inputs="['due']"
        @clearArr="updateWeek(selected,'quizes', [])">
        Quiz
      </weekly-code-module>

      <div class="uk-text-center">
      <a href="#case-slide" uk-toggle>
        <el-button  class="center" size="large" style=" margin-right: 10px"> Add Case <i class="fas fa-info-circle"></i></el-button>
      </a>
        <el-button  @click="updateWeek(selected,'cases', [])" class="center" size="large" type="danger" style=""> Clear Cases <i class="fas fa-trash"></i></el-button>
      </div>
    </el-card>
    </div>
    <div class="canvas-code">
      <container-component :cid="`activity-${act.id}`"
        v-for="(act, i) in weeks"
        :key="act.id"
        :defaultRows="activityDefaultRowsByID(act.id)"
        v-show="i === selected" />
    </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex"
import { quillEditor } from "vue-quill-editor"
import ContainerComponent from '../common/ContainerComponent.vue'
import PageMixin from "../../components/mixins/page-mixin"
import RowTypes from '../../util/row-types.js'
import WeeklyCodeModule from "../weekly/WeeklyCodeModule.vue"
import WeeklyVideo from "../weekly/WeeklyVideo.vue"
import WeeklyDiscussion from "../weekly/WeeklyDiscussion.vue"
import WeeklyAssignment from "../weekly/WeeklyAssignment.vue"
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
  name: "Activity",
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
      videoEditable: false,
      showEditor: false,
      videos: [],
      discussions: [],
      assignments: [],
      quizes:[],
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
    ContainerComponent,
    WeeklyVideo,
    WeeklyCodeModule,
    WeeklyDiscussion,
    WeeklyAssignment
  },
  computed: {
    ...mapGetters(["getInfo", "getDWeek", "getWeeks", "getCases"]),
    selected(){
      return this.getWeekIndexByID(this.getSelectedWeekID)
    },
    defRows(){
      return [
        [this.simpleBannerCol({banner: {getter: {title: 'info.title'}}})],
        [this.activityIntroCol()],
        [['activity-video-list-slot']],
        ['case-list'],
        [['activity-item-list-slot']],
      ]
    },
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
  mixins: [RowTypes, PageMixin],
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
      let manifestID = "ccb-session-" + (this.selected + 1) + "-disccusion-" + (this.weeks[this.selected].discussions.length + 1)
      let currentDate = this.weeks[this.selected].date 
      let due = currentDate === 'hidden' ? 'hidden' : moment(currentDate).add(7, "d")
      let tempDisc = {
        link: "$CANVAS_OBJECT_REFERENCE$/discussion_topics/" + manifestID,
        due,
        manifestID
      }
      console.log(tempDisc)
      this.$store.dispatch("addDiscussion", {index:this.selected, data: tempDisc})
    },

    addAssignment() {
      let manifestID = "ccb-session-" + (this.selected + 1) + "-assignment-" + (this.weeks[this.selected].assignments.length + 1)
      let currentDate = this.weeks[this.selected].date 
      let due = currentDate === 'hidden' ? 'hidden' : moment(currentDate).add(7, "d")
      let tempAssign = {
        link: "$CANVAS_OBJECT_REFERENCE$/assignments/" + manifestID,
        due,
        manifestID
      }
      this.$store.dispatch("addAssignment", {index:this.selected, data: tempAssign})
    },
    addQuiz() {
      let manifestID = "ccb-session-" + (this.selected + 1) + "-quiz-" + (this.weeks[this.selected].quizes.length + 1)
      let currentDate = this.weeks[this.selected].date 
      let due = currentDate === 'hidden' ? 'hidden' : moment(currentDate).add(7, "d")
      let tempQuiz = {
        link: "$CANVAS_OBJECT_REFERENCE$/assignments/" + manifestID,
        due,
        manifestID
      }
      this.$store.dispatch("addQuiz", {index:this.selected, data: tempQuiz})
    },

    setToDefault() {
      console.log("resetting data...")
      let dWeek = _.cloneDeep(this.$store.getters.getDWeek)
      let props = ["description", "title", "body", "required", "videos", "discussions", "assignments", "quizes","cases"]

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
  mounted(){
    this.weeks.forEach(week => {
      if (!week.cases) week.cases = []
    })
    // this.updateCode("week-code")
  }
}
</script>

<style scoped lang="scss">
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

// Make the left menu follow the scroll
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
        max-width: 340px;
        margin: 0 auto;
    }
  }

  .canvas-code {
    display: inline-block;
  }
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



.box-card {
  width: 480px;
}

.card {
  margin: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
</style>
