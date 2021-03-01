<template>
    <div class="activity-page">
        <div class="code-container">
            <hr>
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
                        :key="student.id"
                        :label="student.name"
                        :value="{index, key: student.id}">
                    </el-option>
                    </el-option-group>

                </el-select>

                <el-button style="float: right; padding: 3px 0" type="text" @click="iEditable = !iEditable"> {{ iEditable ? "Save" : "Edit" }}</el-button>

                </div>
                <el-button style="float: right; margin-bottom: 10px;" type="danger" size="medium" @click="removeStudent">Remove</el-button>

                <div v-show="iEditable" v-if="info.students.length > 0" class="center">
                <el-input style="width: 200px; float:left" class="e-input" :value="info.students[selected.index].name" @input="updateUser(info.students[selected.index],'name', $event)"> </el-input>
                <el-input class="e-input" v-if="info.students" :value = "info.students[selected.index].company" @input="updateUser(info.students[selected.index],'company', $event)"> </el-input>
                <el-input class="e-input" v-if="info.students" :value="info.students[selected.index].title" @input="updateUser(info.students[selected.index],'title', $event)"> </el-input>
                <el-input class="e-input" v-if="info.students" type="textarea" autosize :value="info.students[selected.index].bio" @input="updateUser(info.students[selected.index],'bio', $event)"> </el-input>
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
            <div class="canvas-code">
            <container-component cid="newstudentlist" :defaultRows="defRows"/>
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
    ContainerComponent,
    quillEditor
  },
  computed: {
    ...mapGetters(["getInfo", "getDStudent", "getWeeks", "getTheme"]),
    selected(){
      return this.getWeekIndexByID(this.getSelectedWeekID)
    },
    defRows(){
      return [
        [this.simpleBannerCol()],
      ]
    },
  },
  mixins: [RowTypes, PageMixin],
  methods: {
    doNothing(e) {
      e.preventDefault();
      return false;
    },
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
      this.$http.post("http://ec2-34-229-16-148.compute-1.amazonaws.com:3000/image", formData).then(
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
      this.$store.dispatch("addStudent")

      this.selected = {
        index: this.info.students.length - 1,
        key: this.info.students[this.info.students.length - 1].id
      }
      this.sortStudents()
    },
    removeStudent() {

      let { key, index } = this.selected
      let student = this.info.students[index]

      if (index == 0) {
        this.selected = { index: 0, key: this.info.students[0].id }
      } else {
        this.$store.dispatch("deleteStudent", student)
        this.selected = { index: index - 1, key: this.info.students[index - 1].id }
      }
    },

    clearStudents() {
      this.$store.dispatch("clearStudents")
      this.selected = { index: 0, key: this.info.students[0].id }

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
      let dInfo = _.cloneDeep(this.$store.getters.getDInfo)
      let props = ["students"]

      props.forEach(prop => {
        this.updateProp(prop, dInfo[prop])
      })
    },

    getSaveStateConfig() {
      return {
        cacheKey: "Student List"
      }
    }      

  },
  mounted(){

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
