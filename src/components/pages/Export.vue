<template>
  <div id="app">
    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center uk-grid-match" uk-grid>
      <div>
        <div class="uk-background-primary uk-padding uk-light">
          <h1>EXPORT/IMPORT COURSEBUILDER</h1>
          <hr>
          <p>
          If you have finished building your class or want to save the data you have previously submitted into the coursebuilder, click the export button to
          save a ".json" file that you can import at a later date (using the import section below).
          </p>
          <button
            class="uk-button-large uk-button-default"
            type="button"
            name="button"
            @click="exportJSON"
          >Export Coursebuilder Data
          </button>
          <hr>
          <p>
            If you have previously saved an export file from this version of Coursebuilder you can use the input below to import all of the data into this
            session. Warning! This will overwrite all information you have currently entered.
          </p>
          <!-- uk-box-shadow-large if shadow needed -->
              <div class=" uk-padding-small uk-padding-remove-bottom">
                    <h4>Select a ".json" file from a previous data export</h4>
                      <form>
                      <button
                        class="uk-button uk-button-default"
                        v-if="hasImportData"
                        @click.prevent="performImport"
                      >File read successfully! Click here to confirm import.</button>
                      <div class="uk-margin" uk-margin>
                        <input
                          style="display:inline-block;"
                          class="uk-padding"
                          type="file"
                          accept=".json"
                          name="import-file"
                          @change="onImportFileChange"
                        />
                        <!-- <input style="display:inline-block;" class="uk-padding" type="file" name="import-file2" @change="onImportFileChange2" /> -->
                        <br />
                        <br />
                      </div>
                    </form>
              </div>
               <div class="uk-box-shadow-large uk-padding-small uk-padding-remove-bottom" v-if="false">
                    <h4>Select an ".imscc" file from a canvas course export</h4>
                      <form>
                      <button
                        class="uk-button uk-button-default"
                        v-if="hasPacakgeImportData"
                        @click.prevent="performPackageImport"
                      >File read successfully! Click here to confirm import.</button>
                      <div class="uk-margin" uk-margin>
                        <input
                          style="display:inline-block;"
                          class="uk-padding"
                          type="file"
                          accept=".imscc"
                          name="import-file"
                          @change="onImportPacakgeFileChange"
                        />
                        <!-- <input style="display:inline-block;" class="uk-padding" type="file" name="import-file2" @change="onImportFileChange2" /> -->
                        <br />
                        <br />
                      </div>
                    </form>
              </div>

        </div>
      </div>
      <div>
        <div class="uk-background-secondary uk-padding uk-light">
          <h1>EXPORT CANVAS</h1>
           <hr>

          <p>
            If you have completed your class and would like to import it directly into Canvas as an ".imscc" file, use the button below
            to generate an export of your class.
          </p>

          <button
            class="uk-button-large uk-button-default"
            type="button"
            name="button"
            @click="exportIMSCC"
          >Export Canvas Package</button>
        </div>
      </div>
    </div>

    <container-component v-show="false" cid="home" ref="home"/>

    <container-component :cid="`activity-${act.id}`"
      v-for="act in weeks"
      :key="act.id"
      :ref="`activity-${act.id}`"
      :defaultRows="defRows"
      v-show="false" />

    <container-component v-show="false" cid="syllabus" ref="syllabus"/>
    <container-component v-show="false" cid="activities-list" ref="list"/>


    <zoom v-show="false" ref="zoom" />
    <!-- <syllabus v-show="false" ref="syllabus" /> -->
    <!-- <list v-show="false" ref="list" /> -->
    <div v-for="n in (weeks.length)" :key="n">
      <week-view v-show="false" :idx="n-1" :ref="'week'+ n" />
    </div>
    <div v-for="n in (info.students.length)" :key="n">
      <student-view v-show="false" :idx="n-1" :ref="'student'+ n" />
    </div>
    <students-list v-show="false" ref="studentsList" />

  </div>
</template>

<script>
import saveFile from "../../util/save-file"
import PageMixin from "../../components/mixins/page-mixin"
import JSZip from "jszip"
import JSZipUtils from "jszip-utils"
import validator from "validator"

import weekView from "../render/weekView.vue"
import studentView from "../render/studentView.vue"

import zoom from "./Zoom.vue"
import list from "./WeeklyList.vue"
import studentsList from "./StudentsList.vue"
import syllabus from "./Syllabus.vue"
import home from "./Home.vue"

import headings from "../../store/export-headings"
import moment from "moment"
import { mapActions } from 'vuex'

import ContainerComponent from '../common/ContainerComponent.vue'


export default {
  name: "Export",
  data() {
    return {
      hasImportData: false,
      fullscreenLoading: false,
      exportData: {}
    }
  },
  computed: {
  },
  components: { home, syllabus, weekView, list, zoom, studentView, studentsList, ContainerComponent },
  mixins: [PageMixin],
  mounted() {
    let manifest = this.readLocalXML("../../static/files/Clean Course/course_settings/course_settings.xml")
    console.log(manifest)
  },
  methods: {
    ...mapActions(['updateInfo','updateTheme','updateWeeks']),

    onImportFileChange(changeEvent) {
      let file = changeEvent.target.files[0]
      if (!file) {
        return
      }

      let reader = new FileReader()
      reader.onload = loadEvent => {
        this.importData = JSON.parse(loadEvent.target.result)
        this.hasImportData = !!this.importData
      }

      reader.readAsText(file)
    },
    exportIMSCC() {
      let serializer = new XMLSerializer()
      let footer = "</body> </html>"

      //Clean Data
      this.updateProp("url", this.parseUrl(this.info.url))
      this.info.tas.forEach((ta, index) => {
        if (!validator.isEmail(ta.email)) this.updateUser(this.info.tas[index],'email', 'invalidemail@pleasereplace.com')
      })
      this.info.profs.forEach((prof, index) => {
        if (!validator.isEmail(prof.email)) this.updateUser(this.info.profs[index],'email', 'invalidemail@pleasereplace.com')
      })

      JSZipUtils.getBinaryContent("static/files/clean-course.imscc", (err, data) => {
        if (err) {
          throw err // or handle err
        }

        JSZip.loadAsync(data).then(zip => {
          zip.file("wiki_content/home.html", headings.home + this.$refs.home.returnCode() + footer)
          console.log(this.$refs.syllabus.returnCode())
          zip.file(
            "course_settings/syllabus.html",
            headings.syllabus + this.$refs.syllabus.returnCode() + footer
          )

          zip.file("wiki_content/activities.html", headings.list + this.$refs.list.returnCode() + footer)

          let weekly_redirect_url = '<lticm:property name="url">' + this.info.url + "pages/activities</lticm:property>"
          let zoom_redirect_url = '<lticm:property name="url">' + this.info.url + "pages/zoom</lticm:property>"
          let student_list_redirect_url = '<lticm:property name="url">' + this.info.url + "pages/students</lticm:property>"

          // if (this.info.useZoom) {
          //   zip.file("wiki_content/zoom.html", headings.zoom + this.$refs.zoom.returnCode("zoom-code") + footer)
          // }

          if(this.info.useStudents){
            zip.file(
              "wiki_content/students.html",
              headings.studentList + this.$refs.studentsList.returnCode("students-list-code") + footer
            )
            zip.file(
              "ccb-student-list-redirect.xml",
              headings.student_list_redirect_top + student_list_redirect_url + headings.redirect_bottom
            )
          }

          zip.file(
            "ccb-weekly-redirect.xml",
            headings.weekly_redirect_top + weekly_redirect_url + headings.redirect_bottom
          )
          // zip.file("ccb-zoom-redirect.xml", headings.zoom_redirect_top + zoom_redirect_url + headings.redirect_bottom)

          // Add info to manifest
          zip
            .file("imsmanifest.xml")
            .async("string")
            .then(data => {
              let parser = new DOMParser()
              let manifest = parser.parseFromString(data, "text/xml")

              //add weeks
              // for (let i = 1; i <= this.weeks.length; i++) {

              //   let el = document.getElementById("week-box" + (i - 1))
              //   let code = el.innerHTML.replace(/\bdata-v-\S+\"/gi, "")

              // }

              //add students

              let renderRest = () => {
              console.log("rendering rest...")

              if (this.info.useStudents){
                addResource({
                  xml: manifest,
                  type: "redirect",
                  iden: "ccb-student-list-redirect",
                  link: "ccb-student-list-redirect.xml"
                })
                for (let i = 1; i <= this.info.students.length; i++) {
                  let title = "<title>Student " + i + "</title>"
                  let iden = '<meta name="identifier" content="ccb-student' + i + '"/>'
                  let el = document.getElementById("student-box" + (i - 1))
                  let code = el.innerHTML.replace(/\bdata-v-\S+\"/gi, "")
                  zip.file(
                    "wiki_content/student-" + i + ".html",
                    headings.top + title + iden + headings.bottom + code + footer
                  )
                  addResource({
                    xml: manifest,
                    iden: "ccb-student-" + i,
                    link: "wiki_content/pages/student-" + i
                  })
                }
                addResource({ xml: manifest, iden: "ccb-student-list", link: "wiki_content/pages/students" })

              }

              // addResource({ xml: manifest, iden: "ccb-zoom", link: "wiki_content/pages/zoom" })
              addResource({ xml: manifest, iden: "ccb-weekly-list", link: "wiki_content/pages/activities" })

              this.weeks.forEach((week, weekIndex) => {
                week.discussions.forEach((discussion, discussionIndex) => {
                  addResource({
                    xml: manifest,
                    type: "discussion",
                    iden: discussion.manifestID,
                    meta: discussion.manifestID + "-meta"
                  })

                  let discussionTemplate = this.readLocalXML("../../static/files/xml-templates/discussion.xml")
                  let discussionMetaTemplate = this.readLocalXML("../../static/files/xml-templates/discussion_meta.xml")

                  let discussionTitle = discussionTemplate.getElementsByTagName("title")[0]
                  let discussionTopicMeta = discussionMetaTemplate.getElementsByTagName("topicMeta")[0]
                  let discussionTopicID = discussionMetaTemplate.getElementsByTagName("topic_id")[0]
                  let discussionMetaTitle = discussionMetaTemplate.getElementsByTagName("title")[0]

                  discussionTitle.innerHTML = discussionMetaTitle.innerHTML =
                    "Session " + (weekIndex + 1) + " - Discussion " + (discussionIndex + 1)
                  discussionTopicMeta.setAttribute("identifier", discussion.manifestID + "-meta")
                  discussionTopicID.innerHTML = discussion.manifestID

                  let discussionString = serializer.serializeToString(discussionTemplate)
                  let discussionMetaString = serializer.serializeToString(discussionMetaTemplate)
                  zip.file(discussion.manifestID + ".xml", discussionString)
                  zip.file(discussion.manifestID + "-meta" + ".xml", discussionMetaString)
                })

                week.assignments.forEach((assignment, assignmentIndex) => {
                  addResource({
                    xml: manifest,
                    type: "assignment",
                    iden: assignment.manifestID
                  })

                  let assignmentHTML = document.implementation.createHTMLDocument()
                  assignmentHTML.title = "Session " + (weekIndex + 1) + " - Assignment " + (assignmentIndex + 1)
                  zip.file(assignment.manifestID + "/" + assignment.manifestID + ".html", assignmentHTML.documentElement.innerHTML)

                  let assignmentSettings = this.readLocalXML("../../static/files/xml-templates/assignment_settings.xml")
                  let assignmentTag = assignmentSettings.getElementsByTagName("assignment")[0]
                  let assignmentTitle = assignmentSettings.getElementsByTagName("title")[0]
                  let assignmentDue = assignmentSettings.getElementsByTagName("due_at")[0]
                  let assignmentLock = assignmentSettings.getElementsByTagName("lock_at")[0]
                  let assignmentUnlock = assignmentSettings.getElementsByTagName("unlock_at")[0]

                  console.log(assignmentUnlock)
                  console.log(moment(week.date).format())

                  assignmentTag.setAttribute("identifier", assignment.manifestID)
                  assignmentTitle.innerHTML = "Session " + (weekIndex + 1) + " - Assignment " + (assignmentIndex + 1)
                  assignmentDue.innerHTML = assignmentLock.innerHTML = moment(assignment.due).format()
                  assignmentUnlock.innerHTML = moment(week.date).format()

                  let assignmentSettingsString = serializer.serializeToString(assignmentSettings)
                  zip.file(assignment.manifestID + "/assignment_settings.xml", assignmentSettingsString)
                })
              })

              let manifestString = serializer.serializeToString(manifest)
              console.log(manifest)
              zip.file("imsmanifest.xml", manifestString)

              let today = new Date()
              let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
              let time = today.getHours() + "-" + today.getMinutes()
              let dateTime = date + " " + time

              zip.generateAsync({ type: "blob" }).then(blob => {
                saveFile({
                  name: this.info.title + " (" + dateTime + ").imscc",
                  data: blob
                })
              })
            }

            let renderWeek = (i) => {
              let title = "<title>Session " + i + "</title>"
              let iden = '<meta name="identifier" content="ccb-session' + i + '"/>'
              let code
              let activityID = this.weeks[(i-1)].id

              this.setStateField({field: 'selectedWeekID', value: activityID}).then( (res) => {
                console.log('id', `activity-${activityID}`)
                code = this.$refs[`activity-${activityID}`][0].returnCode()

                zip.file(
                  "wiki_content/session-" + i + ".html",
                  headings.top + title + iden + headings.bottom + code + footer
                )
                addResource({
                  xml: manifest,
                  iden: "ccb-session-" + i,
                  link: "wiki_content/pages/session-" + i
                })
                console.log(code)
                if (i+1 <= this.weeks.length) renderWeek(i+1)
                else renderRest()
              })
            }

            renderWeek(1)

            })
        })
      })

      function addResource(options) {
        let { xml, iden, link, type = "page", meta } = options
        let resource = xml.createElement("resource")
        let file = xml.createElement("file")
        resource.appendChild(file)

        let resourceList = xml.getElementsByTagName("resources")[0]

        resource.setAttribute("identifier", iden)

        switch (type) {
          case "page":
            resource.setAttribute("type", "webcontent")
            resource.setAttribute("href", link)
            file.setAttribute("href", link)
            break
          case "discussion":
            resource.setAttribute("type", "imsdt_xmlv1p1")
            resource.setAttribute("href", iden + ".xml")
            file.setAttribute("href", iden + ".xml")

            let depend = xml.createElement("dependency")
            depend.setAttribute("identifierref", meta)
            resource.appendChild(depend)

            let metaResource = xml.createElement("resource")
            let metaFile = xml.createElement("file")
            metaResource.appendChild(metaFile)
            metaResource.setAttribute("identifier", meta)
            metaResource.setAttribute("type", "associatedcontent/imscc_xmlv1p1/learning-application-resource")
            metaResource.setAttribute("href", meta + ".xml")
            metaFile.setAttribute("href", meta + ".xml")

            resourceList.appendChild(metaResource)
            break
          case "assignment":
            resource.setAttribute("type", "associatedcontent/imscc_xmlv1p1/learning-application-resource")
            resource.setAttribute("href", iden + "/" + iden + ".html")
            file.setAttribute("href", iden + "/" + iden + ".html")

            let settingsFile = xml.createElement("file")
            resource.appendChild(settingsFile)
            settingsFile.setAttribute("href", iden + "/assignment_settings.xml")
            break
          case "redirect":
            resource.setAttribute("type", "imsbasiclti_xmlv1p0")
            resource.setAttribute("href", link)
            file.setAttribute("href", link)
            break
          default:
            break
        }

        resourceList.appendChild(resource)
      }

      // add wait function?
      setTimeout(() => {
        this.exportJSON()
      }, 1500)
    },
    performImport() {
      this.$store.dispatch('updateState', this.importData.store)
      /*
      this.updateInfo(this.importData.store.info)
      this.updateTheme(this.importData.store.theme.theme)

      if (!this.info.students) this.info.students = []

      this.importData.store.weeks.forEach(week => {
        if (!week.cases) week.cases = []
      })

      this.updateWeeks(this.importData.store.weeks)
      this.$router.push({ path: "/home" })
      */
     alert('Data imported successfully!')
      this.$router.push({ path: "/home" })
    },
    exportJSON() {
      this.exportData = {}
      this.exportDataIfPossible()
    },
    exportDataIfPossible() {
      console.log("here")

      let waitTime = 0

      // get store
      this.exportData.store = this.$store.getters.getStore

      let today = new Date()
      let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
      let time = today.getHours() + "-" + today.getMinutes()
      let dateTime = date + " " + time

      // save file as json
      console.log("exporting..")
      setTimeout(() => {
        saveFile({
          name: this.$store.state.info.title + " (" + dateTime + ").json",
          data: JSON.stringify(this.exportData)
        })
      }, waitTime)
    },
    readLocalXML(path) {
      var output = null
      var xmlhttp = new XMLHttpRequest()
      xmlhttp.open("GET", path, false)
      xmlhttp.send()
      if (xmlhttp.status == 200) {
        output = xmlhttp.responseText
      }
      let parser = new DOMParser()
      let parsedXML = parser.parseFromString(output, "text/xml")
      return parsedXML
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

.export-container {
  width: 100%;
  text-align: center;
}

.export-button {
  width: 80px;
  height: 50px;
}

.center {
  text-align: center;
}
</style>
