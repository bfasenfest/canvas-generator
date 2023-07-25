<template>

  <div class="home-page">
    <div class="code-container">
    <hr>
    <div class="textbox-container">
      <div class="card">
      <div class="center">
        <el-input-number  style="margin: 10px;" v-model="userInput.toChange" :min="1" :max="20" />

        <button type="button" class="add-weekly center uk-button uk-button-primary"
        name="button" @click="populateActivities(userInput.toChange)">Edit # of Activities</button>
      </div>
      <div v-if="info.classType.option == 'Weekly Course'" class="center">
        <strong>Start Date:</strong>
        <el-date-picker
          style="margin: 10px; margin-bottom:20px"
          :value="info.startDate"
          @input="changeStartDate($event)"
          type="date"
          placeholder="Pick start date">
        </el-date-picker>
      </div>

      <hr>

      <div>
        <el-card>

        <div v-if="weeks.length > 0">
          <div class="code-input center uk-margin-small-top">
            <label for="select">Edit Session:</label> <br>
            <select v-model="userInput.weekNumber" class="uk-select" >
              <option v-for="n in weeks.length" :value="n" :key="n">{{info.classType.dateType}} {{n}}</option>
            </select>
          </div>



          <div class="code-input center uk-margin-small-top">
            <label for="text-area">Title</label> <br>
            <el-input type="textarea" autosize :value="weeks[userInput.weekNumber - 1].title"
            @input="updateWeek(userInput.weekNumber - 1,'title', $event)"> </el-input>
          </div>
<!-- 
          <div class="code-input center uk-margin-small-top">
            <label for="text-area">Description</label>
            <el-input type="textarea" autosize :value="weeks[userInput.weekNumber - 1].description"
            @input="updateWeek(userInput.weekNumber - 1,'description', $event)"> </el-input>
          </div> -->
          <div class="center">
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
          <div class="code-input center ">
            <button type="button" name="button" class="uk-button-small uk-button-primary" @click="updateSwitch">{{userInput.uploadSwitchText}}</button> <br> <br>

            <form name="file-form" v-show="this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('image')">
              <input name="image" id="image-file" type="file"> <br> <hr>
              <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
            </form>
            <form v-show="!this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('url')">
              <input name="imageUrl" id="image-url" type="text" class="uk-input"> <br>  <hr>
              <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
            </form>
            <button class="uk-button uk-button-danger uk-margin-small-top" @click="setDefaultImage(userInput.weekNumber - 1)">Reset Image</button>
            <button class="uk-button uk-button-danger uk-margin-small-top" @click="summarizeModuleGPT(userInput.weekNumber - 1)">Summarize</button>

          </div>
        </div>
        </el-card>
        <div class="center" style="margin-top:20px">
          <el-button type="warning" @click="toggleDates">{{ datesActive ? 'Remove Dates' : 'Add Dates' }}</el-button>
        </div>
        <!-- <div class="center add-weekly">
          Links
          <el-switch
            :value="info.useLinks"
            @input="updateProp('useLinks', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>

          Dates
          <el-switch
            :value="info.useDates"
            @input="updateProp('useDates', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="center add-weekly">
          Images
          <el-switch
            :value="info.useWeeklyImages"
            @input="updateProp('useWeeklyImages', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div> -->

      </div>
    </div>
    </div>
    <div class="canvas-code">
      <container-component cid="activities-list" :defaultRows="homeLayout"/>
    </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from "vuex"
import PageMixin from "../../components/mixins/page-mixin"
import { quillEditor } from "vue-quill-editor"
import saveState from "vue-save-state"
import _ from 'lodash'
import ContainerComponent from '../common/ContainerComponent.vue'
import RowTypes from '../../util/row-types.js'

var moment = require("moment")

var toolbarOptions = [
  ["bold", "italic", "underline"],
  ["blockquote", { list: "ordered" }, { list: "bullet" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }, "clean"],
  ["link", "image"]
]

export default {
  name: "Activities",
  data() {
    return {
      userInput: {
        startDate: null,
        weekNumber: 1,
        toChange: 12,
        isFile: true,
        isLinked: true,
        uploadSwitchText: "Click to Upload Image from Url"
      },
      needsInit: true,
      outputCode: "",
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      },
      homeLayout: [
      ],
    }
  },
  computed:{
    ...mapGetters({
      weeks: 'getWeeks',
      info: 'getInfo'
    }),
    activityRows(){
      let rows =  this.$store.getters.getRowsByCID['activities-list'] || []
      return rows.filter( row => row.type == 'activity-row')
    },
    datesActive(){
      console.log(this.weeks[0].date)
      return this.weeks[0].date !== 'hidden'
    },
  },
  methods: {
    ...mapActions([
      'deleteRow',
      'deleteRows',
      "addWeek",
      "sliceWeek",
      "updateWeeks",
      "updateInfo",
      'clearLastAffectedRow',
      'clearStashedWeek'
    ]),
    async summarizeModuleGPT(index){

    let promptText = ''

    this.weeks[index].videos.forEach( (video, i) => {
      promptText += video.description
    })
    console.log('prompt', promptText)

    const request = new Request(
        "https://cb-openai-proxy.netlify.app/openai",
        {
          method: "POST",
          mode: "cors",
          cache: "default",
          body: JSON.stringify({prompt: promptText})
        }
      );
      const res = await fetch(request);
      const data = await res.json();
      this.updateWeek(index, "description", data.completion.content)

  },
    updateSwitch() {
      this.userInput.isFile = !this.userInput.isFile
      this.userInput.uploadSwitchText = this.userInput.isFile
        ? "Click to Upload Image from URL"
        : "Click to Upload Image from Computer"
    },
    changeStartDate(event) {
      this.updateProp("startDate", event)
      this.updateDates()
    },
    updateDates() {
      // right now do not update if in exec training mode
      if (true) {
        //this.info.classType.dateType == "Week"
        this.weeks.forEach((week, index) => {
          let interval = this.info.classType.option == "Weekly Course" ? "w" : "d"
          let date = moment(this.info.startDate).add(index, interval)
          this.updateWeek(index, "date", date)
        })
      }
    },
    updateImages() {
      this.weeks.forEach((week, index) => {
        if (index > 14 && this.info.classType.dateType == "Week") index = 14
        let imgSrc = this.$store.state.imageServer + this.info.classType.dateType.toLowerCase() + (index + 1) + ".png"
        if (week.imgSrc.includes(this.$store.state.imageServer)) this.updateWeek(index, "imgSrc", imgSrc)
      })
    },
    setDefaultImage(index) {
      let imgSrc = this.$store.state.imageServer + this.info.classType.dateType.toLowerCase() + (index + 1) + ".png"
      this.updateWeek(index, "imgSrc", imgSrc)
    },
    AddActivity() {
      let index = this.weeks.length + 1
      this.addWeek(index)
    },
    // Adds a user inputted number of activities
    populateActivities(num) {
      let diff = num - this.weeks.length

      if (diff > 0) {
        for (let i = 0; i < diff; i++) this.AddActivity()
      }

      if (diff < 0) {
        this.userInput.weekNumber = 1
        this.sliceWeek(num)
      }

    },
    toggleDates(){
      let val = this.datesActive? 'hidden' : this.getInfo.startDate
      for (let i = 0; i <= this.activityRows.length; i++){
        this.updateWeek(i, 'date', val)
      }
    },
    onFormSubmit(type, ev) {
      var formData = new FormData()

      if (type == "url") {
        console.log("uploading url...")
        var imageurl = document.querySelector("#image-url") // Gets form data in html
        if (imageurl.value == "") return
        formData.append("imageUrl", imageurl.value) // Adds api header to tell server that it is a url
      } else {
        console.log("uploading file...")
        var imagefile = document.querySelector("#image-file")
        if (imagefile.files.length == 0) return
        formData.append("image", imagefile.files[0]) // Adds api header to tell server that it is a file
      }

      // More api headers to tell the server the dimensions to crop
      formData.append("imageWidth", 360)
      formData.append("imageHeight", 150)

      // Send post request to Amazon server using vue-resource with form data
      this.$http.post("https://images.columbiacoursebuilder.org/image", formData).then(
        response => {
          console.log("success")
          let imageData = JSON.parse(response.bodyText)
          this.updateWeek(this.userInput.weekNumber - 1, "imgSrc", imageData.imageUrls[0]) // Change requisite weekly activity image src to the hosted file
          // this.weeks[this.userInput.weekNumber - 1].imgSrc = imageData.imageUrls[0]
        },
        response => {
          console.log(response)
        }
      )
    },
    getSaveStateConfig() {
      return {
        cacheKey: "Weeklylist"
      }
    }
  },
  mixins: [RowTypes, saveState, PageMixin],
  watch: {
    weeks: {
      handler(newWeeks) {
          if (newWeeks !== null) {

            let weekIDs = []
            let rowWeekIDs = []
            newWeeks.forEach(week => weekIDs.push(week.id))
            this.activityRows.forEach(row => rowWeekIDs.push(row.data.weekID))


            let diff = newWeeks.length - this.activityRows.length

            if (diff < 0) {
              this.activityRows.forEach (row => {
                if (!_.includes(weekIDs, row.data.weekID)) this.deleteRow(row.rid)
              })
            }

            if (diff > 0) {
              newWeeks.forEach ((week, index) => {
                if (!_.includes(rowWeekIDs, week.id)) {
                  this.$store.dispatch('createRowsFromArray', {
                    cid: 'activities-list',
                    rows: this.activityRowByID(week.id),
                    type: 'activity-row',
                    data: {
                      weekID: week.id
                    }
                  })
                }
              })
            }

          }
        },
        immediate: true
      }
  },
  beforeMount(){
    // add banner to top of Weekly List Element
    // this.$store.dispatch('createRowsFromArray', {
    //   cid: 'activities-list',
    //   rows: ['banner-row', 'weekly-activity-list-intro']
    // })

  },
  beforeDestroy() {
    this.clearLastAffectedRow()
    this.clearStashedWeek()
  },
  components: {
    ContainerComponent
  },
}
</script>

<style scoped lang="scss">
h1,
h2 {
  font-weight: normal;
}

a h5{
  font-size: 18px;

}

ul {
  list-style-type: none;
  padding: 0;
}

textarea {
  width: auto;
}

.add-weekly {
  margin: 10px;
}

.card {
  width: 350px;
  margin: auto;
  justify-content: center;

}


.code-input {
  margin: 10px;
}

.quill {
  width: 75%;
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
    justify-content: center;
    position: sticky;
    display: inline-block;
    top: 16px;
    vertical-align: top;
    max-width: calc(100% - 1080px);
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
</style>
