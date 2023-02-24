<template>
  <div :id="'student-box'+idx" >
  <div class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]" style="width: 1054px;">
        <p>{{info.students[idx].name.toUpperCase()}}</p>
      </div>

      <div class="clear">&nbsp;</div>

      <!-- Student -->
      <div style="float: left; display: inline; width: 45%; height: auto; background-color: #f7f7f7; color: #333333; margin: 0 10px 10px 0; padding: 10px;">
        <a href='#'><img style="width: 100%; height: auto;" :src="info.students[idx].imgSrc" alt="" /></a>
      </div>
      
      <div style="float: left; display: inline; width: 48%; height: auto; background-color: #f7f7f7; color: #333333; padding: 10px;">
        <p style="margin: 0 10px; color: #666666; font-size: 16px; font-weight: bold;">Name:</p>
        <p style="margin: 0 10px; color: #999999; font-size: 16px; font-weight: normal;">{{info.students[idx].name}}</p>
        <p style="line-height: 18px; margin: 0;">&nbsp;</p>
        <p style="margin: 0 10px; color: #666666; font-size: 16px; font-weight: bold;">Company:</p>
        <p style="margin: 0 10px; color: #999999; font-size: 16px; font-weight: normal;">{{info.students[idx].company}}</p>
        <p style="line-height: 18px; margin: 0;">&nbsp;</p>
        <p style="margin: 0 10px; color: #666666; font-size: 16px; font-weight: bold;">Title:</p>
        <p style="margin: 0 10px; color: #999999; font-size: 16px; font-weight: normal;">{{info.students[idx].title}}</p>
        <p style="line-height: 18px; margin: 0;">&nbsp;</p>
        <p style="margin: 0 10px; color: #666666; font-size: 16px; font-weight: bold;">Bio:</p>
        <p style="margin: 0 10px; color: #999999; font-size: 16px; font-weight: normal;">{{info.students[idx].bio}}</p>
      </div>
  

    
      <div class="clear">&nbsp;</div>

  </div>
  </div>

</template>

<script>
import PageMixin from "../../components/mixins/page-mixin"
var moment = require("moment")

export default {
  data() {
    return {
      index: 1,
      editable: false
    }
  },
  computed: {
    currentItem() {
      return this.content[this.index - 1]
    },
    url() {
      return this.info.url.replace(/\/?(\?|#|$)/, "/$1")
    }
  },
  methods: {
    returnCode() {
      console.log("student code..")
      let code = document.getElementById("student-box" + this.idx)
      console.log(code)
      return code.innerHTML.replace(/\bdata-v-\S+\"/gi, "")
    },
    formatDate(date) {
      return moment(date).format("MMMM Do")
    },
    newLine(val) {
      if (!val) return ""
      return val.replace(/\r?\n/g, "<br />")
    }
  },
  props: ["idx"],
  mixins: [PageMixin]
}
</script>

<style lang="css">
</style>
