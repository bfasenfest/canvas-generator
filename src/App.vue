<template>
  <div id="app" ref="app">

    <el-row>
      <!-- Off Canvas Menu Slide -->
      <el-col :span="6" style="padding: 20px;">
        <a href="#offcanvas-slide" class="uk-button uk-button-default noBorder" uk-toggle><span uk-icon="icon: table"></span> &nbsp;Menu</a>
      </el-col>

      <!-- Breadcrumb navigation bar -->
      <el-col :span="12" style="padding: 10px;">
          <ul class="bcTrail center">
            <li><router-link class="router" to="/home">Home</router-link></li>
            <!-- <li><router-link class="router" to="/home-old">Home#</router-link></li> -->
            <li><router-link class="router" to="/activities">Activity List</router-link></li>
            <!-- <li><router-link class="router" to="/activities-old">Activities List#</router-link></li> -->
            <li><router-link class="router" to="/activity">Activity</router-link></li>
            <!-- <li><router-link class="router" to="/weekly-old">Activity#</router-link></li> -->
            <li><router-link class="router" to="/syllabus">Syllabus</router-link></li>
            <!-- <li><router-link class="router" to="/syllabus-old">Syllabus#</router-link></li> -->
            <li v-show="info.classType.option == 'Executive Training'"><router-link class="router"  to="/program">Program Overview</router-link></li>
            <li v-show="info.useStudents"><router-link class="router" to="/studentlist">Students List</router-link></li>
            <li v-show="info.useStudents"><router-link class="router" to="/student" >Student</router-link></li>
            <!-- <li v-show="info.useZoom"><router-link class="router"  to="/zoom">Zoom</router-link></li> -->
            <li><router-link class="router" to="/modules">Module Builder</router-link></li>
            <li><router-link class="router" to="/export">Export</router-link></li>
          </ul>
      </el-col>

      <!-- Top Right Dialog Buttons -->
      <el-col :span="6">
        <div class="uk-float-right uk-padding-small">
          <a href="#" v-loading.fullscreen.lock="loading" @click="openDialog">
            <el-button type="primary" style="display: inline-block;">Course Settings: <i class="fas fa-cog"></i></el-button>
          </a>

          <!-- New Dropdown, not yet designed
          <el-dropdown>
            <el-button type="success">
              Code <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="fas fa-code"></i> View the code</el-dropdown-item>
              <el-dropdown-item><i class="fas fa-copy"></i> Copy the code</el-dropdown-item>
              <el-dropdown-item><i class="fas fa-exclamation-triangle"></i> Reset to default</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->

          <a href="#help-slide" uk-toggle>
            <el-button type="warning" style="display: inline-block;"> Help <i class="fas fa-info-circle"></i></el-button>
          </a>
        </div>
      </el-col>
    </el-row>

    <vue-snotify></vue-snotify>

    <!-- HELP CONTENT -->
    <div id="help-slide" uk-offcanvas="mode: push">
      <div class="uk-offcanvas-bar help-bar">
         <button class="uk-offcanvas-close" type="button" uk-close></button>
         <h3>Help</h3>
         <div v-html="helpInfo.body"></div>
         <div v-show="!helpInfo.exists">
           <p> There is no help available for this page </p>
         </div>
         <p> Please check the <router-link class="router" to="/guide">User Guide</router-link> for more information. </p>
         <p>If you encounter any bugs please
          email a detailed description of the bug and its context to <a :href="'mailto:coursebuilderhelp@gmail.com?Subject=Bug ' + info.title " target="_top">coursebuilderhelp@gmail.com</a></p>
     </div>
    </div>

    <!-- MENU CONTENT -->
    <div id="offcanvas-slide" uk-offcanvas>
        <div class="uk-offcanvas-bar uk-background">
        <ul class="uk-nav uk-nav-default">
          <li class="uk-nav-header"><router-link class="router" to="/guide">USER GUIDE</router-link></li>
          <li class="uk-nav-header">TEMPLATES</li>
          <li><router-link class="router" to="/home">Home Page</router-link></li>
          <li><router-link class="router" to="/syllabus">Syllabus</router-link></li>
          <li v-show="info.classType.option == 'Executive Training'"><router-link class="router" to="/program">Program Overview</router-link></li>
          <li><router-link class="router" to="/activities">Activites</router-link></li>
          <li ><router-link class="router" to="/activity">Individual Activity</router-link></li>
          <li v-show="info.useZoom"><router-link class="router"  to="/zoom">Zoom</router-link></li>

          <li class="uk-nav-header"><router-link class="router" to="/export">Export/Import Data</router-link></li>
          <li class="uk-nav-header"><router-link class="router" to="/credits">CREDITS</router-link></li>
          <li class="uk-nav-divider uk-margin-medium-top uk-margin-medium-bottom"></li>
          <li><router-link to="/">Course Builder Home</router-link></li>
          <li><a href="https://www.opengov.network/" target="_blank">Canvas Website</a></li>
          <li class="uk-nav-divider uk-margin-medium-top uk-margin-medium-bottom"></li>
        </ul>
        </div>
    </div>

    <!-- COURSE INFO DIALOG -->
    <el-dialog title="Course Settings"
               :visible.sync="dialogFormVisible"
               style="width: 80%; margin:auto;">
      <div class="left">
        <p>
          <label for="coursetitle" style="min-width: 90px">Course Title</label>
          <el-input name="coursetitle" style="width: 400px" placeholder="Please input" :value="info.title" @input="updateProp('title', $event)"></el-input>
        </p>
        <p>
          <label for="courseurl" style="min-width: 90px">Course URL</label>
          <el-input name="courseurl" style="width: 400px" placeholder="Please input" :value="info.url" @input="updateProp('url', $event)"></el-input>
        </p>
        <p>
        <!-- Course Type is currently not an option -->
          <!-- <label for="select" style="min-width: 90px;">Course Type</label>
          <select style="display: inline-block; width:150px; margin-right: 30px;" v-model="info.classType" @input="updateProp('classType', $event)" name="Choose Banner" class="uk-select">
            <option v-for="type in info.classOptions" :value="type">{{type.option}}</option>
          </select> -->

          <label style="min-width: 60px;">Organization </label>
          <select style="display: inline-block; width:150px" v-model="theme" name="Choose Banner" class="uk-select">
            <option v-for="theme in $store.getters.getThemeOptions" :value="theme" :key="theme.option">{{theme.option}}</option>
          </select>
        </p>
        <!-- <p>
          <label for="select" style="min-width: 110px">Blended Model</label>
          <el-switch
            v-model="info.isBlended"
            @input="updateProp('isBlended', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </p> -->
         <p>
          <label for="select" style="min-width: 150px">Use Zoom</label>
          <el-switch
            :value="info.useZoom"
            @input="updateProp('useZoom', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </p>
        <p>
          <label for="select" style="min-width: 150px">Use Student Pages</label>
          <el-switch
            v-model="info.useStudents"
            @input="updateProp('useStudents', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </p>
      </div>

      <el-button @click="showAllCourses">Show all courses</el-button>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

    <!-- ALL COURSES DIALOG -->
    <el-dialog title="All Courses"
               :visible.sync="showingCourses"
               style="width: 80%; margin:auto;">

      <div class="courses">
        <div class="course"
             v-for="(course, index) in $store.getters.getSavedStates"
             :key="course.uuid"
             :class="{ active: course.uuid == currentCourse }"
             @click="currentCourse = course.uuid">
          <h3>
            {{ JSON.parse(course.versions[course.version].info).title }}
            <a v-if="$store.getters.getSavedStates.length > 1" @click="deleteCourse(index)" class="delete-course">Delete</a>
          </h3>
          <small>{{ course.uuid }}</small>
          <div class="course-versions">
            <div v-for="(version, i) in course.versions" :key="i">
              <input v-model="course.version" :value="i" type="radio" class="course-version form-check-input" :id="course.uuid + '-' + i">
              <label class="form-check-label" :for="course.uuid + '-' + i">
                Version {{ i + 1 }} <a v-if="course.versions.length > 1" @click="deleteVersion(index, i, $event)" class="delete-version">Delete</a>
              </label>
            </div>
            <a class="add-version" @click="addVersion(course)">Add Version</a>
          </div>
        </div>
      </div>

      <div class="add-new">
        <label>Add new course</label>
        <input class="form-control" v-model="newCourseName" placeholder="New course name" />
        <el-button type="primary" @click="addNewCourse('default')">Save from default</el-button>
        <el-button type="primary" :disabled="!newCourseName" @click="addNewCourse('current')">Save from current state</el-button>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showingCourses = false">Cancel</el-button>
        <el-button type="primary" @click="chooseCourse">Choose</el-button>
      </span>
    </el-dialog>

    <div class="clearfix"></div>

    <!-- If Export Should be Top Level Insert Code Here -->


    <!-- Where each router component is loaded when navigated to by a router link -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="50%">
        <component :is="dialogData.type" :dialogData="dialogData" @cancelDialog="closeDialog" />
    </el-dialog>

    <!-- <el-drawer
      :title="dialogData.title"
      :visible.sync="dialogVisible"
      :with-header="false"
      direction="ltr"
      size="50%">
      <h3 style="margin:10px">{{dialogData.title}}</h3>
      <component :is="dialogData.type" :dialogData="dialogData" @cancelDialog="closeDialog" style="margin:10px" />
    </el-drawer> -->

    <div class="clearfix" />

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left uk-margin-medium-top" uk-grid>
        <div class="uk-background-muted uk-padding">
        <p>Copyright © Columbia University. All rights reserved.</p>
         </div>
    </div>

    <!-- <div id="render-components" v-if="!$store.getters.areComponentsRendered">
      <container-component v-for="page in pages" :key="page.name" :cid="page.name" :defaultRows="page.rows" />
    </div> -->
  </div>
</template>

<script>
import _ from 'lodash'
import saveState from "vue-save-state"
import { mapGetters, mapActions } from "vuex"
import help from "./store/help"
import PageMixin from "./components/mixins/page-mixin"
import RowTypes from './util/row-types'
import ContainerComponent from './components/common/ContainerComponent.vue'

// Dialog Types
import ConfigSlot from "./components/dialogs/ConfigSlot.vue"
import ConfigSlotData from "./components/dialogs/ConfigSlotData.vue"

import ChooseRow from "./components/dialogs/ChooseRow.vue"
import ChooseSlot from "./components/dialogs/ChooseSlot.vue"
import ChooseCol from "./components/dialogs/ChooseCol.vue"

import DeleteSlot from "./components/dialogs/DeleteSlot.vue"
import UploadImage from "./components/dialogs/UploadImage.vue"
import DeleteRow from './components/dialogs/DeleteRow.vue'
import DeleteColumn from './components/dialogs/DeleteColumn.vue'

// Dialog Data Types
import SlotDataBannerSlot from './components/dialogs/data/BannerSlot.vue'
import SlotDataImageSlot from './components/dialogs/data/ImageSlot.vue'
import SlotDataVideoSlot from './components/dialogs/data/VideoSlot.vue'
import SlotDataActivityVideoListSlot from './components/dialogs/data/ActivityVideoListSlot.vue'

import moment from "moment"

export default {
  components: {
    ConfigSlot,
    ConfigSlotData,
    ChooseRow,
    ChooseCol,
    ChooseSlot,
    DeleteSlot,
    UploadImage,
    DeleteRow,
    DeleteColumn,
    SlotDataImageSlot,
    SlotDataVideoSlot,
    SlotDataBannerSlot,
    ContainerComponent,
    SlotDataActivityVideoListSlot
  },
  name: "app",
  data() {
    return {
      hasImportData: false,
      dialogFormVisible: false,
      exportData: {},
      showingCourses: false,
      newCourseName: '',
      currentCourse: null,
      currentVersion: null,
      pages: null
    }
  },
  created() {
    const self = this

    if(!this.$store.getters.getConfig) {
      this.$store.dispatch('setConfig')
    }

    if(self.getCurrentCourse == null) {
      self.$store.dispatch('addSavedState')
      .then(current => {
        self.$store.dispatch('setCurrentCourse', current)
        self.$store.dispatch('setCurrentVersion', 0)
        self.currentCourse = current
        self.currentVersion = 0
      })
    }

    else {
      self.currentCourse = self.getCurrentCourse
      self.currentVersion = self.getCurrentVersion
    }
  },
  methods: {
    ...mapActions(["updateWeek", "addWeek", "sliceWeek", "updateWeeks", "updateInfo", "addTA",
                  "addProf", "addStudent","setStateField", "addModule"]),
    showAllCourses(){
      const version = this.currentVersion
      this.$store.dispatch('setSavedState', { uuid: this.getCurrentCourse, version: version })
      this.showingCourses = true
    },
    addNewCourse(from) {
      const self = this
      if(from === 'current') {
        const version = this.currentVersion
        this.$store.dispatch('setSavedState', { uuid: this.getCurrentCourse, version: version })
        .then(() => {
          self.$store.dispatch('setInfoField', {
            field: 'title',
            value: self.newCourseName
          })
          setTimeout(() => {
            self.$store.dispatch('addSavedState')
            .then(current => {
              self.$store.dispatch('setCurrentCourse', current)
              self.$store.dispatch('setCurrentVersion', 0)
              self.currentCourse = current
              self.currentVersion = 0
              self.newCourseName = ''
            })
          }, 500)
        })
      }
      else {
        const version = this.currentVersion
        this.$store.dispatch('setSavedState', { uuid: this.getCurrentCourse, version: version })
        .then(() => {
          setTimeout(() => {
            self.$store.dispatch('addSavedState', 'default')
            .then(current => {
              self.$store.dispatch('setCurrentCourse', current)
              self.$store.dispatch('setCurrentVersion', 0)
              self.currentCourse = current
              self.currentVersion = 0
              self.newCourseName = ''
            })
          }, 500)
        })
      }
    },
    addVersion(course) {
      const version = this.currentVersion
      this.$store.dispatch('setSavedState', { uuid: this.getCurrentCourse, version: version })
      this.$store.dispatch('addNewVersion', course.uuid)
    },
    deleteVersion(course, version, e) {
      e.preventDefault();
      this.currentVersion = 0
      this.$store.dispatch('setCurrentVersion', 0)
      this.$store.dispatch('setSavedStateVersion', { uuid: this.$store.getters.getSavedStates[course].uuid, version: 0 })
      .then(() => {
        this.$store.dispatch('deleteCourseVersion', {
          course,
          version
        })
      })
    },
    deleteCourse(index) {
      let current = index
      this.$store.dispatch('deleteCourse', current)
      .then(() => {
        this.currentCourse = this.$store.getters.getSavedStates[0].uuid
        this.currentVersion = 0
        this.$store.dispatch('setCurrentCourse', this.$store.getters.getSavedStates[0].uuid)
        this.$store.dispatch('setSavedStateVersion', { uuid: this.$store.getters.getSavedStates[0].uuid, version: 0 })
      })
    },
    chooseCourse() {
      const version = _.find(this.getSavedStates, { uuid: this.currentCourse }).version
      this.$store.dispatch('chooseSavedState', { uuid: this.currentCourse, version: version })
      this.$store.dispatch('setCurrentCourse', this.currentCourse)
      this.$store.dispatch('setCurrentVersion', version)
      this.currentVersion = version
      this.showingCourses = false
    },
    getSaveStateConfig() {
      return {
        cacheKey: "App"
      }
    },
    closeDialog() {
      this.$store.dispatch("setDialogVisibility", false)
    },
    openDialog(e) {
      e.preventDefault();
      this.dialogFormVisible = true
    },
  },
  mixins: [RowTypes, saveState, PageMixin],
  computed: {
    ...mapGetters([ 'isSettingsVisible', 'getCurrentCourse', 'getCurrentVersion', 'getSavedStates', 'getWeeks', 'getDefaultState', "getModules" ]),
    loading() {
      return this.$store.getters.loading
    },
    helpInfo() {
      let path = this.$route.name
      let body = help[path] || ""
      body = "<h5>" + path + "</h5>" + body
      return { body, exists: help[path] }
    },
    dialogVisible: {
      get: function() {
        return this.$store.getters.isDialogVisible
      },
      set: function(newValue) {
        this.$store.dispatch("setDialogVisibility", newValue)
      }
    },
    dialogData() {
      return this.$store.getters.getDialogData
    },
    defActivityRows(){
      return [
        [this.simpleBannerCol({banner: {getter: {title: 'info.title'}}})],
        [this.activityIntroCol()],
        [['activity-video-list-slot']],
        ['case-list'],
        [['activity-item-list-slot']],
      ]
    },
    defSyllabusRows(){
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
    }
  },
  beforeMount() {
    if(this.getDefaultState === null) {
      this.$store.dispatch('setDefaultState')
    }

    if (this.getModules.length < 1) {
      console.log("building base module")
      this.addModule()
    }

    if (this.weeks.length < 1) {
      console.log("building new weeks")
      for (let i = 1; i <= 12; i++) {
        let tempWeek = {}
        tempWeek.title = "Lecture " + i
        tempWeek.secondTitle = "Lecture " + i + " II"
        tempWeek.imgSrc =
          this.$store.state.imageServer + this.$store.state.info.classType.dateType.toLowerCase() + i + ".png"
        tempWeek.date = moment().add((i-1), "w")
        this.addWeek(tempWeek)
      }
      this.setStateField({field: 'selectedWeekID', value: this.getWeeks[0].id})
    }
    if (this.info.students.length < 1) this.addStudent()
    if (this.info.profs.length < 1) this.addProf()
    if (this.info.tas.length < 1) this.addTA()

    if(!this.$store.getters.areComponentsRendered) {

      this.updateRowTypes(this.rowTypes)
      this.updateColTypes(this.colTypes)
      this.updateSlotTypes(this.slotTypes)

      console.log('building pages...')
      this.pages = []
      console.log(this.pages)

      let containers = this.defaultContainerRows
      let keys = Object.keys(containers)
      keys.forEach(key => {
        this.$store.dispatch('createRowsFromArray', {
          cid: key,
          rows: containers[key]
        })
        console.log(key)

        // this.pages.push({name: key, rows: containers[key]})
      })

      this.weeks.forEach ((week, index) => {
        this.$store.dispatch('createRowsFromArray', {
          cid: 'activity-' + week.id,
          rows: this.activityDefaultRowsByID(week.id) //containers['activity']
        })

        console.log('Built activity-' + week.id);

        this.$store.dispatch('createRowsFromArray', {
          cid: 'activities-list',
          rows: this.activityRowByID(week.id),
          type: 'activity-row',
          data: {
            weekID: week.id
          }
        })
      })

      setTimeout(() => {
        this.$store.dispatch('setRenderedComponents', true)
      }, 1000)

    }
  }
}
</script>

<style lang="scss">

#render-components {
  display: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

.canvas-code {
  width: 1015px;
  margin: auto;
  margin-bottom: auto;
  align-self: flex-start;
}

.help-bar {
  width: 500px;
}

.export-container {
  height: 80px;
  margin: 10px;
}

.center {
  text-align: center;
}

.nav-text {
  font-size: 25px;
  margin: 25px;
}

.routers {
  margin-bottom: 20px;
}

.nav-button {
  display: inline-block;
}

.bcTrail {
  padding-top: 15px;
}

.bcTrail li {
  list-style: none;
  display: inline-block;
  padding-right: 5px;
  font-size: 13px;
}

.bcTrail li::after {
  content: " / ";
  padding-left: 5px;
}

.bcTrail li a {
  text-decoration: none;
  color: #48576a;
}

.bcTrail li a:hover {
  text-decoration: none;
  color: #39f;
}

.courses {
  overflow: auto;
  max-height: 40vh;

  .course {
    border: 1px solid #CCC;
    padding: 16px;
    margin-bottom: 7px;
    cursor: pointer;

    h3 {
      margin-bottom: 1px;
    }

    small {
      color: #777;
    }

    &.active {
      border-color: #409EFF;
      background-color: #eff5fc;
      cursor: default;

      h3, small {
        color: #409EFF;
      }
    }

    .delete-course {
        float: right;
        font-size: 20px;
        margin-top: -7px;
        color: #ea2121;
    }

    .course-versions {
      margin-top: 12px;

      label {
        font-weight: normal;
        vertical-align: middle;

        .delete-version {
          margin-left: 20px;
          color: red;
        }
      }
    }
  }
}

.add-new {
  margin: 25px 0 7px;

  button {
    margin-top: 12px;
    padding: 12px 25px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.el-dialog__body {
  max-height: 52vh;
  overflow: auto;
}

.tox-notifications-container {display: none !important;}

.code-container {
  > .textbox-container {
    min-width: 350px;

    > div {
      max-width: 100% !important;

      .el-card__body {
        button {
          @media screen and (max-width: 900px) {
            display: block;
            width: 100%;
            margin: 7px 0;
          }
        }
      }
    }
  }

  > .canvas-code {
  max-width: calc(100% - 370px);

    > .canvas-code {
      max-width: 100%;
    }
  }
}
</style>
