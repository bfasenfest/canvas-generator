<template>
  <div class="hello">
    <div class="uk-child-width-1-1@s uk-light" uk-grid>
        <div>
            <div class="uk-background-cover uk-height-large uk-panel uk-text-center" style="background-image: url(static/images/cover01.jpg);">
               <p>&nbsp;</p>
               <p>&nbsp;</p>
               <img class="columbia-logo" src="https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/columbia-logo-white.png" />
               <h1 class="uk-heading"><span class="uk-margin-small-right" uk-icon="icon: cog; ratio: 2.5"></span> CANVAS COURSE BUILDER</h1>
               <button class="uk-button uk-button-primary uk-button-large" @click="getStarted">Get Started</button>
               <!-- <button class="uk-button uk-button-primary uk-button-large" @click="dialogFormVisible = true">Get Started</button> -->
            </div>
        </div>
    </div>

    <el-dialog title="Course Info" :visible.sync="dialogFormVisible">
      <label for="input"> Course Title <el-input placeholder="Please input" v-model="info.title"></el-input> </label>
      <label for="input"> Course URL <br> <el-input autosize style="width: 400px" placeholder="Please input" v-model="info.url"></el-input> </label>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="getStartedModal">Confirm</el-button>
      </span>
    </el-dialog>

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>1</h1>
            	<h5>DESIGN IN REAL TIME</h5>
            	<p>This website allows Columbia Professors and TA’s to quickly build Canvas class websites using our pre-built course template. </p>
            </div>
        </div>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>2</h1>
            	<h5>EXPORT CODE</h5>
            	<p>Once each page is built, you can copy the code for the page template.</p>
            </div>
        </div>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>3</h1>
            	<h5>INSERT INTO CANVAS</h5>
            	<p>And insert it into the canvas Page! See <router-link class="router" to="/guide">user guide</router-link> for details.</p>
            </div>
        </div>
    </div>


    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left" uk-grid>
        <div class="uk-background-muted uk-padding">
    		<p>Copyright © Columbia University. All rights reserved.</p>
       	</div>
    </div>
  </div>
</template>

<script>
import store from '../store'
import { EventBus } from '../bus'
import saveState from 'vue-save-state';
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'Home',
  data () {
    return {
      dialogFormVisible: false,
    }
  },
  computed: {
    info: {
      get () {
        return this.$store.getters.getInfo
      },
      set (payload) {
        this.$store.commit('updateInfo', payload)
      }
    },
  },
  methods: {
    getStarted(){
      this.$router.push({name: 'Home'});
    },
    getStartedModal(){
      this.dialogFormVisible = false
      this.$router.push({name: 'Home'});
    }
  },
  mounted () {
    // If it should load all pages on the splash, run the code below

    // let initialPath = this.$route.path
    // let paths = ['/home', '/weekly', '/weeklylist'].filter(p => p !== initialPath).concat([initialPath])
    // paths.forEach((path, i) => {
    //   setTimeout(() => this.$router.replace(path), i * 30)
    // })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .columbia-logo {
    width: 500px;
  }
</style>
