<template lang="html">

  <div id="weeklylist">

  <hr>

  <div class="code-container">

    <div class="textbox-container">
      <div class="teacher uk-card uk-card-default uk-card-body uk-card-small  uk-card-hover uk-margin-top center">
        <h3 class="uk-card-title center">
        Professor Info
        <button type="button" class="uk-button-small uk-button-primary edit-button" name="button"@click="pEditable = !pEditable">{{ pEditable ? "Save" : "Edit" }}</button>
        </h3>

        <div v-show="pEditable">
          <el-input type="textarea" autosize v-model="prof.name"> </el-input>
          <el-input type="textarea" autosize v-model="prof.email"> </el-input>
          <el-input type="textarea" autosize v-model="prof.hours"> </el-input>
          <button type="button" name="button" class="uk-button-small uk-button-primary" @click="updateSwitch">{{userInput.uploadSwitchText}}</button> <br> <br>

          <!-- These forms upload the file or url to Amazon S3. More detail in the onFormSubmit method. -->
          <form name="file-form" v-show="this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('image', prof)">
            <input name="image" id="image-file" type="file"> <br>
            <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
          </form>
          <form v-show="!this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('url', prof)">
            <input name="imageUrl" id="image-url" type="text" class="uk-input"> <br> <br>
            <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
          </form>
        </div>
      </div>

      <div class=" teacher uk-card uk-card-default uk-card-body uk-card-small  uk-card-hover uk-margin-top center">
        <h3 class="uk-card-title center">
        TA Info
        <button type="button" class="uk-button-small uk-button-primary edit-button" name="button"@click="tEditable = !tEditable">{{ tEditable ? "Save" : "Edit" }}</button>
        </h3>

        <div v-show="tEditable">
          <el-input type="textarea" autosize v-model="ta.name"> </el-input>
          <el-input type="textarea" autosize v-model="ta.email"> </el-input>
          <el-input type="textarea" autosize v-model="ta.hours"> </el-input>
          <button type="button" name="button" class="uk-button-small uk-button-primary" @click="updateSwitch">{{userInput.uploadSwitchText}}</button> <br> <br>

          <!-- These forms upload the file or url to Amazon S3. More detail in the onFormSubmit method. -->
          <form name="file-form" v-show="this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('image', ta, '#image-file2')">
            <input name="image" id="image-file2" type="file"> <br>
            <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
          </form>
          <form v-show="!this.userInput.isFile" class="your-form-class" v-on:submit.prevent="onFormSubmit('url', ta, '#image-url2')">
            <input name="imageUrl" id="image-url2" type="text" class="uk-input"> <br> <br>
            <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
          </form>
        </div>
      </div>
    </div>

    <!-- Where the canvas code is stored -->
    <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]">
        <p>{{userInput.title.toUpperCase()}}</p>
      </div>

      <!-- Professors & TAs -->
      <div class="content-box">
        <div class="grid-row">

          <!-- Professor Info Box -->
          <div class="col-xs-6 col-md-6">
            <div class="styleguide-section__grid-demo-element pad-box-mini border border-tl">

              <!-- must have weeklyIconImg class for responsiveness -->
              <!-- landscape images work best. 350x200 seems ideal -->
              <div class="STV1_BlueBG">
                <img :src="prof.imgSrc" class="STV1_SyllabusPhoto" />
              </div>

              <p>Instructor:</p>
              <p>{{prof.name}} (<a :href="'mailto:'+prof.email">{{prof.email}}</a>) <br /> Office Hours: <span v-html="profInfo"></span></p>
            </div>
          </div>
          <!-- End Professor Info Box -->

          <!-- Professor Info Box -->
          <div class="col-xs-6 col-md-6">
            <div class="styleguide-section__grid-demo-element pad-box-mini border border-tl">

              <!-- must have weeklyIconImg class for responsiveness -->
              <!-- landscape images work best. 350x200 seems ideal -->
              <div class="STV1_BlueBG">
                <img :src="ta.imgSrc" class="STV1_SyllabusPhoto" />
              </div>


              <p>Teaching Assistant:</p>
              <p>{{ta.name}} (<a :href="'mailto:'+ta.email">{{ta.email}}</a>) <br /> Office Hours: <span v-html="taInfo"></span></p>
            </div>
          </div>
          <!-- End Professor Info Box -->

        </div>
      </div>
      <!-- End Professors & TAs -->

      <!-- Meeting Dates & Times -->
      <div class="content-box pad-box-mini border border-t border-b">
        <p>Meeting Dates/Times: Tuesday 9:00-10:50 am (IAB Room 411)</p>
        <p>Special Discussion Forums: Thursday 9:00-10:50 am (IAB Room 411)</p>
      </div>
      <!-- End Meeting Dates & Times -->

      <!-- Course Description -->
      <div class="content-box pad-box-mini border border-b">
        <h2>Course Description</h2>
        <p>Use this space here for course description.</p>
      </div>
      <!-- End Course Description -->

      <!-- Course Objectives -->
      <div class="content-box pad-box-mini border border-b">
        <h2>Course Objectives</h2>
        <p>Use this space here for course objectives.</p>
      </div>
      <!-- End Course Objectives -->

      <!-- Instruction Method -->
      <div class="content-box pad-box-mini border border-b">
        <h2>Method of Instruction</h2>
        <p>The course will achieve its learning objectives by deploying a combination of lectures, cases, readings,
          videos, role plays, debates, and discussions with experienced field and policy practitioners.</p>
      </div>
      <!-- End Instruction Method -->

      <!-- Weekly Schedule table -->
      <div class="content-box pad-box-mini border border-b">
        <h2>Weekly Schedule</h2>
      </div>

          <table class="ic-Table ic-Table--hover-row">
            <thead>
              <tr>

                <!-- Column Labels -->
                <!-- If you add a label here for an additional column, that column must be added to all rows as well -->
                <th>Week</th>
                <th>Theme</th>
                <th>Date</th>
                <th>Topic</th>
                <th>Instructor</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Theme</td>
                <td>Date</td>
                <td>Topic</td>
                <td>Instructor</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Theme</td>
                <td>Date</td>
                <td>Topic</td>
                <td>Instructor</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Theme</td>
                <td>Date</td>
                <td>Topic</td>
                <td>Instructor</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Theme</td>
                <td>Date</td>
                <td>Topic</td>
                <td>Instructor</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Theme</td>
                <td>Date</td>
                <td>Topic</td>
                <td>Instructor</td>
              </tr>
            </tbody>
          </table>
      <!-- End Weekly Schedule table -->

      <!-- Grading -->
      <div class="content-box pad-box-mini border border-b">
        <h2>Grading</h2>
        <p>Students will be graded through a Mid-term Exam (20%), two research/policy papers, together comprising 60% of the grade, and Class Participation (20%):</p>
        <ul>
          <li>Quiz on Weeks 1 to 6 lectures and readings, worth 20% of grade (Thursday March 2)</li>
          <li>Assignment 1, worth 20% of grade (1,250 words, due at 11:59 pm Sunday March 12)</li>
          <li>Assignment 2, worth 40% of grade (2,500 words, due at 11:59 pm Sunday May 7)</li>
        </ul>
      </div>
      <!-- End Grading -->

      <!-- Additional Resources -->
      <div class="content-box pad-box-mini border border-b">
        <h2>Additional Resources</h2>
        <p>Beyond the weekly required and supplementary readings and viewings, the following resources are recommended if you are seeking to gain a superior level of understanding of the subject matter of this course. If you come across other interesting and useful
          resources relevant to the course objectives, please share these with the class through your blog posts.</p>
      </div>
      <div class="content-box pad-box-mini border border-b">
        <h2>Academic Integrity Statement</h2>
        <p>The School of International &amp; Public Affairs does not tolerate cheating and/or plagiarism in any form. Those students who violate the Code of Academic &amp; Professional Conduct will be subject to the Dean&rsquo;s Disciplinary Procedures. Cut and
          paste the following link into your browser to view the Code of Academic &amp; Professional Conduct online. <a href="http://bulletin.columbia.edu/sipa/academic-policies">http://bulletin.columbia.edu/sipa/academic-policies</a></p>
        <p><strong>Please note that, per the SIPA Code of Conduct, &ldquo;plagiarism includes but is not limited to:</strong></p>
        <ul>
          <li><strong>Submitting written work of any kind (e.g., reports, essays, exercises, papers), or portions of such written work that is not my own, but rather the written work of another author;</strong></li>
          <li><strong>Failing to acknowledge, through proper footnotes and bibliographic entries, the source of ideas not my own;</strong></li>
          <li><strong>Failing to indicate through proper use of quotations and footnotes whenever my work includes paraphrases of ideas or verbatim expressions not my own;</strong></li>
          <li><strong>Submitting written work prepared for one course to meet the requirements of a second course without having received in writing prior permission from both instructors;</strong></li>
          <li><strong>Collaborating with other students or outside sources on an assignment or examination without specific permission from the faculty member to do so;</strong></li>
          <li><strong>Using another person&rsquo;s or institution&rsquo;s research or data without attribution.&rdquo;</strong></li>
        </ul>
        <p>Please familiarize yourself with the proper methods of citation and attribution. The School provides some useful resources online; we strongly encourage you to familiarize yourself with these various styles before conducting your research:</p>
        <p>Violations of the Code of Academic &amp; Professional Conduct should be reported to the Associate Dean for Student Affairs.</p>
      </div>
      <!-- End Additional Resources -->

      <div class="clear">&nbsp;</div>


    </div>

  </div>

  <div class="uk-float-right">
    <a class="uk-button uk-button-primary" href="#modal-overflow" uk-toggle>View the Code</a>
    <button class="uk-button uk-button-primary" @click="copyText('aux')">Copy the Code</button>
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
import store from '../store'
import { EventBus } from '../bus'
import { quillEditor } from 'vue-quill-editor';
import saveState from 'vue-save-state';

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote', {
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  ['link', 'clean']
];

export default {
  name: "weekly",
  data() {
    return {
      userInput: {
        title: store.title,
        isFile: true,
        uploadSwitchText: "Click to Upload Image from Url",
      },
      prof:{
        name: "Professor Name",
        email: "professor@sipa.columbia.edu",
        hours: "Monday 3:00-6:00 pm (IAB Room 1434)",
        imgSrc: "http://via.placeholder.com/200x200"
      },
      ta: {
        name: "TA Name",
        email: "ta@sipa.columbia.edu",
        hours: "Tuesday 1:00-2:30 pm (Publique, IAB 6th floor)",
        imgSrc:"http://via.placeholder.com/200x200"
      },
      pEditable: true,
      tEditable: true,
      outputCode: '',
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    quillEditor,
  },
  mixins: [saveState],
  computed: {
    profInfo(){
      return this.prof.hours.replace(/\r?\n/g, '<br />')
    },
    taInfo(){
      return this.ta.hours.replace(/\r?\n/g, '<br />')
    }
  },
  methods: {
    copyText(option) {
      var copyTextarea = document.querySelector('#copy-text-area');

      if (option == 'aux'){
        var aux = document.createElement("input");
        aux.setAttribute("value", copyTextarea.value);
        document.body.appendChild(aux);
        aux.select();
        console.log('creating aux element..')
      }
      else {
        copyTextarea.select();
      }

      document.execCommand('copy')

      this.$snotify.success('Code has been copied', {showProgressBar: false});

      if (option == 'aux') document.body.removeChild(aux);
    },
    updateCode() {
      let code = document.getElementById("canvas-code");
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/ig, "")
      this.userInput.title = store.title // Home.data().userInput.title
    },
    updateSwitch() {
      this.userInput.isFile = !this.userInput.isFile;
      this.userInput.uploadSwitchText = this.userInput.isFile ? "Click to Upload Image from URL" : "Click to Upload Image from Computer"
    },
    onFormSubmit (type, obj, id = (type == 'url') ? '#image-url' : '#image-file' , ev){
      var formData = new FormData();

      if (type == 'url'){
        console.log('uploading url...')
        var imageurl = document.querySelector(id); // Gets form data in html
        formData.append("imageUrl", imageurl.value);  // Adds api header to tell server that it is a url
      }
      else {
        console.log('uploading file...')
        var imagefile = document.querySelector(id);
        formData.append("image", imagefile.files[0]); // Adds api header to tell server that it is a file
      }

      // More api headers to tell the server the dimensions to crop
      formData.append('imageWidth', 200)
      formData.append('imageHeight', 200)

      // Send post request to Amazon server using vue-resource with form data
      this.$http.post('http://ec2-34-229-16-148.compute-1.amazonaws.com:3000/image',formData).then( response => {
        console.log('success')
        let imageData = JSON.parse(response.bodyText);
        obj.imgSrc = imageData.imageUrls[0] // Change requisite weekly activity image src to the hosted file
      }, response => {
        console.log(response)
      });

    },
    setToDefault(){

    },
    getSaveStateConfig() {
      return {
          'cacheKey': 'Syllabus',
      };
    }
  },
  mounted() {
    this.updateCode();
    setInterval(() => {
      this.updateCode();
    }, 1000);
  },
  beforeCreate(){
    EventBus.$on('set-default', response => {
      this.setToDefault()
      console.log(response)
    })

    EventBus.$on('import-data', data => {
      this.userInput = { ...data.weekly.userInput}
      this.videos = data.weekly.videos
      this.assignments = data.weekly.assignments
      this.discussions = data.weekly.discussions
      console.log('importing data to weekly...')
    })

    EventBus.$on('export-data', () => {

      // let weeklyList = {
      //   weeklyActivites: this.weeklyActivites
      // }
      // EventBus.$emit('list-data', weeklyList)

      let syllabus = this.$data
      console.log('sending syllabus')
      EventBus.$emit('syllabus-data', syllabus)
    })
  },
  beforeUpdate() {
    this.updateCode();
  }

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
  float:right;

}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 500px;
  margin: auto;
  align-self: flex-start;
  margin-top: 20px
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
  width: 1015px;
  margin: auto;
  margin-bottom: auto;
  align-self: flex-start;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

#copy-text-area {
  width: 80%;
  height: 200px
}

.GFbanner {
  height: 190px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}
</style>
