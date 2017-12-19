<template>
  <div class="hello">

    <!-- This Div contains all of the information inputs -->
    <!-- Currently it uses a component from the Element UI library for the tabs -->

    <div class="clearfix"></div>

    <div>
    	<ul class="uk-tab uk-flex-center" data-uk-tab="{connect:'#tab-content'}">
        <li class="uk-active"><a href="#">Course Info</a></li>
        <li><a href="#">Description</a></li>
    		<li><a href="#">Professor</a></li>
    		<li><a href="#">TA</a></li>
    		<li><a href="#">Meeting Times</a></li>
    		<li><a href="#">Media Input</a></li>
        <li><a href="#">Banner</a></li>
    	</ul>
    	<ul id="tab-content" class="uk-switcher uk-margin">
    		<li class="uk-active uk-text-center">
          <textarea v-model="userInput.title" class="code-input uk-input" rows="1" cols="25"></textarea>
          <textarea v-model="userInput.semester" class="code-input uk-input" rows="1" cols="20"></textarea>
          <textarea v-model="userInput.url" class="code-input uk-input" rows="1" cols="45"></textarea> <br>
        </li>
    		<li class="uk-text-center">
          <div class='quill'>
            <quill-editor ref="myTextEditor"
                          v-model="userInput.description"
                          :config="editorOption">
            </quill-editor>
          </div>
    		</li>
    		<li class="uk-text-center">
          <textarea v-model="userInput.professor" class="code-input uk-input" rows="1" cols="20"></textarea>
          <textarea v-model="userInput.pEmail" class="code-input uk-input" rows="1" cols="25"></textarea>
          <textarea v-model="userInput.office" class="code-input uk-input" rows="1" cols="50"></textarea> <br>
        </li>
    		<li class="uk-text-center">
          <textarea v-model="userInput.ta" class="code-input uk-input" rows="1" cols="20"></textarea>
          <textarea v-model="userInput.tEmail" class="code-input uk-input" rows="1" cols="25"></textarea>
          <textarea v-model="userInput.tOffice" class="code-input uk-input" rows="1" cols="50"></textarea> <br>
    		</li>
    		<li class="uk-text-center">
          <textarea v-model="userInput.meetings" class="code-input uk-input" rows="1" cols="50"></textarea>
          <textarea v-model="userInput.discussions" class="code-input uk-input" rows="1" cols="50"></textarea> <br>
    		</li>
    		<li class="uk-text-center">
          <button type="button" class="uk-button uk-button-primary " name="button" @click="mediaSwitch">{{userInput.mediaSwitchText}}</button>
          <textarea v-show="this.userInput.isVideo" v-model="userInput.video" class="code-input uk-input" rows="1" cols="50"></textarea>
          <form  style="display: inline-block;"v-show="!this.userInput.isVideo" class="your-form-class" v-on:submit.prevent="onFormSubmit('image')">
            <input style="display: inline-block;" name="image" id="image-file" type="file">
            <input style="display: inline-block;" type="submit" class="uk-button uk-button-primary" value="Submit!">
          </form>
        </li>
        <li class="uk-text-center">
          <label>
            Banner Image:
            <select style="display: inline-block; width:150px" v-model="theme" name="Choose Banner" class="uk-select">
              <option selected disabled>Choose Banner</option>
              <option v-for="theme in $store.getters.getThemeOptions" :value="theme">{{theme.option}}</option>
            </select>
          </label>
          <label>
            Logo Image:
            <select style="display: inline-block; width:150px" v-model="theme.logo" name="Choose Logo" class="uk-select">
              <option selected disabled>Choose Logo</option>
              <option :value="this.$store.state.imageServer + 'SipaLogo2.png'">SIPA</option>
              <option :value="this.$store.state.imageServer + 'SSW_logo.png'">SSW</option>
              <option :value="this.$store.state.imageServer + 'Mailman_logo.png'">Mailman</option>
            </select>
          </label>
          <!-- <textarea v-show="!this.userInput.isVideo" v-model="userInput.image" class="code-input uk-input" rows="1" cols="50"></textarea> -->
    		</li>
    	</ul>
    </div>

    <hr />

    <div class="clearfix"></div>


    <div class="uk-grid-collapse uk-child-width-expand@s" uk-grid>
      <div class="">
        <div id="canvas-code" class="show-content user_content clearfix enhanced ic-Layout-contentMain">
          <div :class="['pad-box-mega','STV1_Banner', theme.banner]">
            <img :src="theme.logo"/>
            <p>{{userInput.title.toUpperCase()}}</p>
            <p class="STV1_CourseCode">{{userInput.semester}}</p>
          </div>
          <div class="content-box">
            <div class="grid-row">
              <div class="col-xs-6">
                <div class="styleguide-section__grid-demo-element">
                  <div v-if="!this.userInput.isVideo" >
                    <img :src="this.userInput.image" class="STV1_WeeklyIconIMG" alt=""> </img>
                  </div>
                  <div v-if="this.userInput.isVideo" class="embed-container">
                    <iframe :src="this.videoLink" width="300" height="150" allowfullscreen="allowfullscreen"
                    webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe>
                  </div>
                </div>
              </div>
              <div class="col-xs-6">
                <div class="styleguide-section__grid-demo-element">
                  <div class="STV1_Welcome">WELCOME TO {{newTitle.toUpperCase()}}</div>
                  <p class="html" v-html="userInput.description"></p>
                  <p>&nbsp;</p>
                  <p>
                    <a class="Button" style="text-decoration: none;" :href="userInput.url + 'assignments/syllabus'" >Course Syllabus</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box">
            <div class="grid-row">
              <div class="col-xs-6">
                <div class="styleguide-section__grid-demo-element pad-box-mini border border-tbl">
                  <p>Instructor:</p>
                  <p>Professor {{userInput.professor}} (<a :href="'mailto:' + userInput.pEmail">{{userInput.pEmail}}</a>) <br /> {{userInput.office}}</p>
                </div>
              </div>
              <div class="col-xs-6">
                <div class="styleguide-section__grid-demo-element pad-box-mini border border-tbl">
                  <p>TA:</p>
                  <p> {{userInput.ta}} (<a :href="'mailto:' + userInput.tEmail">{{userInput.tEmail}}</a>) <br /> {{userInput.tOffice}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box pad-box-mini border border-b">
            <p><strong>MEETING DATES / TIMES:</strong> {{userInput.meetings}}</p>
            <p><strong>SPECIAL DISCUSSION FORUMS:</strong> {{userInput.discussions}}</p>
          </div>
        </div>
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

  </div>
</template>

<script>
// For testing we remove localstorage -- take line out for build
// localStorage.clear();

import store from '../store'
import { EventBus } from '../bus'
import saveState from 'vue-save-state';
import { quillEditor } from 'vue-quill-editor';

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote',{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] },'clean'],
  ['link']
];

export default {
  name: 'Home',
  data () {
    return {
      userInput: {
        title: store.title,
        url: store.courseUrl,
        themeOptions: this.$store.getters.getThemeOptions,
        semester: "U6411 // SPRING 2017",
        professor: "Glenn Denning",
        pEmail: "gd2147@sipa.columbia.edu",
        ta: "Chandani Punia",
        tEmail:"cp2868@columbia.edu",
        office: "Office Hours: Monday 3:00-6:00 pm (IAB Room 1434)",
        tOffice: "Tuesday 1:00-2:30 pm (Publique, IAB 6th floor)",
        meetings: "Tuesday 9:00-10:50 am (IAB Room 411)",
        discussions: "Thursday 9:00-10:50 am (IAB Room 411)",
        video:"https://vimeo.com/199382848/1dd8fc0f31",
        image:"http://assets.ce.columbia.edu/i/ce/intl/intl-fp@2x.jpg",
        isVideo: false,
        mediaSwitchText: "Toggle to input Video",
        taInfo:"Instructor: \nProfessor Glenn Denning (gd2147@sipa.columbia.edu) Office Hours: Monday 3:00-6:00 pm (IAB Room 1434)",
        description: "Here you’ll find course materials and a range of tools to help you get the most out of the class. \n Please begin by reading the course syllabus, where you’ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester."
      },
      activeName: '1',
      outputCode: "",
      editorOption:{
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    quillEditor
  },
  mixins: [saveState],

  computed: {
    theme: {
      get () {
        return this.$store.getters.getTheme
      },
      set (payload) {
        this.$store.commit('updateTheme', payload)
      }
    },
    // Parses an inputted video link to output the correct embed link for the source
    videoLink(){
      let output;
      let link = this.userInput.video;
      let parts = link.split('/');
      if (parts[2].includes('vimeo.com')){
        output = 'https://player.vimeo.com/video/' + parts[3]
      }
      else if (parts[2].includes('youtube')){
        let split = link.split('=')
        output = 'https://www.youtube.com/embed/' + split[1]
      }
      else {
        output = link;
      }
      return output;
    },
    // Updates the user inputted title and course url into the store
    newTitle(){
      let title = this.userInput.title
      let url = this.userInput.url
      console.log('updating store...')
      store.title = title
      store.courseUrl = this.userInput.url = url.replace(/\/?(\?|#|$)/, '/$1')
      return title
    }
  },
  methods: {
    // Copies the text when user selects the code output area
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

      // UIkit.notification({
      //     message: 'Code has been copied',
      //     pos: 'bottom-center',
      //     status: 'success',
      //     timeout: 3000
      // });

      this.$snotify.success('Code has been copied', {showProgressBar: false});

      if (option == 'aux') document.body.removeChild(aux);
    },
    // Parses the code from the canvas-code div and puts it in the output
    updateCode(){
      let code = document.getElementById("canvas-code");
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/ig,"")
      store.title = this.userInput.title
      store.courseUrl = this.userInput.url
    },
    // Toggles button to insert video or image
    mediaSwitch(){
      this.userInput.isVideo = !this.userInput.isVideo;
      this.userInput.mediaSwitchText = this.userInput.isVideo ? "Toggle to input Image" : "Toggle to input Video"
    },
    setToDefault(){
      console.log('resetting data...')
      this.userInput = { ...store.homeDefault };
      EventBus.$emit('set-default', 'setting all to default...');
    },
    onFormSubmit (type, ev){
      var formData = new FormData();

      if (type == 'url'){
        console.log('uploading url...')
        var imageurl = document.querySelector('#image-url'); // Gets form data in html
        formData.append("imageUrl", imageurl.value);  // Adds api header to tell server that it is a url
      }
      else {
        console.log('uploading file...')
        var imagefile = document.querySelector('#image-file');
        formData.append("image", imagefile.files[0]); // Adds api header to tell server that it is a file
      }

      // More api headers to tell the server the dimensions to crop
      formData.append('imageWidth', 450)
      formData.append('imageHeight', 250)

      // Send post request to Amazon server using vue-resource with form data
      this.$http.post('http://ec2-34-229-16-148.compute-1.amazonaws.com:3000/image',formData).then( response => {
        console.log('success')
        let imageData = JSON.parse(response.bodyText);
        this.userInput.image = imageData.imageUrls[0] // Change requisite weekly activity image src to the hosted file
      }, response => {
        console.log(response)
      });
    },
    getSaveStateConfig() {
      return {
          'cacheKey': 'Home',
      };
    }
  },
  mounted(){
    // Once the component is loaded, start updating the code every second
    this.updateCode();
    setInterval( () => {
      this.updateCode();
    }, 1000);
  },
  beforeCreate(){
    EventBus.$on('import-data', data => {
      this.userInput = { ...data.home.userInput}
      console.log('importing data to home...')
    })

    EventBus.$on('export-data', () => {
      let home = this.$data
      console.log('sending home')
      EventBus.$emit('home-data', home)
    })
  },
  beforeUpdate(){
    this.updateCode();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

textarea {
  width: auto;
}

.quill{
  width: 700px;
  margin: auto;
}

el-tab-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: 'blue';
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.textbox{
  margin-left: 40px;
}

#canvas-code {
  width: 1000px;
  margin: auto;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  margin-right: 30px;
  width: 30%;
}

#copy-text-area {
  width: 100%;
}

.GFbanner {
  height: 190px;
}

.STV1_Banner {
  height: 190px;
}

.crop {
  width: 450px;
  height: 250px;
  object-fit: cover;
}

</style>
