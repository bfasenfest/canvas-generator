<template lang="html">

  <div id="studentlist">

  <hr>

  <div class="code-container">

    <div class="textbox-container">
      <el-card class="card">
          <el-button type="primary" @click="addStudent">Add Student</el-button>
          <el-button type="danger" @click="clearStudents">Clear</el-button>
          <el-button type="success" @click="sortStudents">Sort</el-button>

      </el-card>

      <el-card class="card box-card">
        <div slot="header" class="clearfix">
          <span class="big-text">Edit Info</span>

          <el-select v-model="selected" placeholder="Select" value-key="key" style="width: 180px; margin-left: 10px">
            <el-option-group
              key="students"
              label="Students">
              <el-option
                v-for="(student, index) in info.students"
                :key="student.name"
                :label="student.name"
                :value="{index, key: student.name}">
              </el-option>
            </el-option-group>

          </el-select>

          <el-button style="float: right; padding: 3px 0" type="text"@click="iEditable = !iEditable"> {{ iEditable ? "Save" : "Edit" }}</el-button>

        </div>
        <el-button style="float: right; margin-bottom: 10px;" type="danger" size="medium" @click="removeStudent">Remove</el-button>

        <div v-show="iEditable" v-if="info.students.length > 0" class="center">
          <el-input style="width: 200px; float:left" class="e-input" :value="info.students[selected.index].name" @input="updateUser(info.students[selected.index],'name', $event)"> </el-input>
          <el-input class="e-input" v-if="info.students" v-model="info.students[selected.index].company" @input="updateUser(info.students[selected.index],'company', $event)"> </el-input>
          <el-input class="e-input" v-if="info.students" v-model="info.students[selected.index].title" @input="updateUser(info.students[selected.index],'title', $event)"> </el-input>
          <el-input class="e-input" v-if="info.students" type="textarea" autosize v-model="info.students[selected.index].bio" @input="updateUser(info.students[selected.index],'bio', $event)"> </el-input>
          <button type="button" name="button" class="uk-button-small uk-button-primary" @click="updateSwitch">{{userInput.uploadSwitchText}}</button> <br> <br>

          <!-- These forms upload the file or url to Amazon S3. More detail in the onFormSubmit method. -->
          <form name="file-form" v-show="this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('image', info.students[selected.index])">
            <input name="image" id="image-file" type="file"> <br>
            <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
          </form>
          <form v-show="!this.userInput.isFile" v-if="info.students" class="your-form-class" v-on:submit.prevent="onFormSubmit('url', info.students[selected.index])">
            <input name="imageUrl" id="image-url" type="text" class="uk-input"> <br> <br>
            <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
          </form>
        </div>
      </el-card>

     


    </div>

    <!-- Where the canvas code is stored -->
    <div id="students-list-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain canvas-code'>
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]" style="width: 1054px;">
        <p>STUDENTS</p>
      </div>

      <p>Introduce yourselves and get to know one another.</p>
      <hr>

      <!-- Student List -->
      <div class="content-box">
        <div class="grid-row">

        <div style="float: left; display: inline; width: 18%; height: auto; background-color: #f7f7f7; color: #333333; margin: 20px 20px 0; padding: 10px;" v-for="(student, index) in info.students">
          <a :href='url + "pages/student-" + (index+1)'><img style="width: 200px; height: auto;" :src="student.imgSrc" alt="" /></a>
          <p style="padding-top: 10px; margin: 0 10px; color: #666666; font-size: 14px; font-weight: bold;">{{student.name}}</p>
          <p style="margin: 0 10px; color: #999999; font-size: 12px; font-weight: normal;">{{student.company}}</p>
        </div>

          <!-- Professor Info Box -->

          <!-- End Professor Info Box -->

        </div>
      </div>


    

    
      <div class="clear">&nbsp;</div>


    </div>

  </div>

  <div class="uk-float-right">
    <a class="uk-button uk-button-primary" href="#modal-overflow" uk-toggle>View the Code</a>
    <button class="uk-button uk-button-primary" @click="copyText({elem:'aux', div: 'students-list-code'})">Copy the Code</button>
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

  <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left uk-margin-medium-top" uk-grid>
      <div class="uk-background-muted uk-padding">
      <p>Copyright © Columbia University. All rights reserved.</p>
      </div>
  </div>

  <!-- <p style="font-weight: bold" class="center">Code Output</p>

  <div class="footer">
    <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea> <br> <br>
  </div> -->

</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import { EventBus } from "../bus"
import { quillEditor } from "vue-quill-editor"
import saveState from "vue-save-state"
import mutations from "../store/mutations"

var moment = require("moment")

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
  name: "StudentsList",
  data() {
    return {
      userInput: {
        isFile: true,
        uploadSwitchText: "Click to Upload Image from Url"
      },
      sections: ["Description", "Objectives", "Schedule"],
      sections2: ["Grading", "Resources", "Integrity"],
      pEditable: false,
      tEditable: false,
      iEditable: true,
      outputCode: "",
      selected: { index: 0 },
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    quillEditor
  },
  mixins: [saveState, mutations],
  watch: {
    // Protects against selected.list becoming an object (need to track down why this happens)
  },
  computed: {
    ...mapGetters(["getInfo", "dStudent", "getWeeks", "getTheme"]),
    url() {
      return this.info.url.replace(/\/?(\?|#|$)/, "/$1")
    }
  },
  methods: {
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
      formData.append("imageWidth", 400)
      formData.append("imageHeight", 400)

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
    addStudent() {
      let tempStudent = _.cloneDeep(this.dStudent)
      let users = _.cloneDeep(this.info.students)

      users.push(tempStudent)
      this.updateProp("students", users)
      this.selected = {
        index: this.info.students.length - 1,
        key: this.info.students[this.info.students.length - 1].name
      }
      this.sortStudents()
    },
    removeStudent() {
      let { key, index } = this.selected
      let users = _.cloneDeep(this.info.students)
      users.splice(index, 1)
      if (index == 0) {
        if (list == "students") {
          console.log("tried to delete student")
          return
          console.log("after return")
        }
        console.log("deleting last ta")
        this.selected = { index: 0, key: this.info.students[0].name }
      } else {
        this.selected = { index: index - 1, key: this.info.students[index - 1].name }
      }
      this.updateProp("students", users)
    },
    clearStudents() {
      this.info.students = [this.dStudent]
    },
    sortStudents() {
      this.info.students.sort(function(a, b) {
        var textA = a.name.toUpperCase()
        var textB = b.name.toUpperCase()
        return textA < textB ? -1 : textA > textB ? 1 : 0
      })
    },
    setToDefault() {
      console.log("resetting data...")
      let dInfo = _.cloneDeep(this.$store.getters.dInfo)
      let props = ["students", "tas", "sectionBox1", "sectionBox2"]

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
  mounted() {
    this.selected = { index: 0, key: this.info.students[0].name }
    this.updateCode("student-list-code")
  },
  beforeCreate() {
    EventBus.$on("set-default", response => {
      this.setToDefault()
      console.log(response)
    })

    EventBus.$on("import-data", data => {
      this.userInput = { ...data.weekly.userInput }
      this.videos = data.weekly.videos
      this.assignments = data.weekly.assignments
      this.discussions = data.weekly.discussions
      console.log("importing data to weekly...")
    })

    EventBus.$on("export-data", () => {
      // let weeklyList = {
      //   weeklyActivites: this.weeklyActivites
      // }
      // EventBus.$emit('list-data', weeklyList)

      let syllabus = this.$data
      console.log("sending syllabus")
      EventBus.$emit("syllabus-data", syllabus)
    })
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

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

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 500px;
  margin: auto;
  align-self: flex-start;
  margin-top: 20px;
}

.teacher {
  width: 350px;
}

.code-input {
  margin: 10px;
}

.quill {
  width: 80%;
  margin-bottom: 50px;
  margin-right: 50px;
  margin-left: 50px;
}

#canvas-code {
  width: 1090px;
  margin: auto;
  margin-bottom: auto;
  align-self: flex-start;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
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
.fade-leave-to {
  opacity: 0;
}
</style>
