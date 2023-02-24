<template>
     <div id="zoom-code">
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]"  style="width: 1054px;">
        <p>{{info.title.toUpperCase()}}</p>
      </div>
     
      <div class="content-box">
      <div class="grid-row">
      <div class="col-xs-12 col-lg-12">
      <div class="ic-image-text-combo">
      <div class="ic-image-text-combo__text">
      <div class="pad-box-mini">
      <h3 style="margin-bottom: 5px;"><i class="icon-group"></i> Zoom Web-Conferencing Collaboration</h3>
      </div>
      <div class="pad-box-mini border border-b border-t">
      <p>Using ZOOM technology, students are able to interact with classmates to discuss and collaborate. Please review the <a class="instructure_file_link instructure_scribd_file" title="Zoom Student Guide - 08.26.16.pdf" href="https://sipa-canvas.s3.us-east-2.amazonaws.com/documents/A1.+Zoom+Student+Guide+-+EMPA.pdf" data-api-returntype="File">Zoom Student Guide</a> and visit <a href="https://zoom.us/">zoom.us</a> to download the desktop client and create a free account.</p>
      <p>Please mute your accounts when joining live streaming zoom sessions.</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div class="content-box">
      <div class="item-group-container" style="padding-bottom: 0;">
      <div class="item-group-condensed">
      <ul id="cond_group_1" class="ig-list">
      <li>
      <div class="ig-row">
      <div class="ig-row__layout">
      <div class="ig-type-icon" aria-hidden="true"><i class="icon-group"></i></div>
      <div class="ig-info"><a class="ig-title" :href="info.zoomLink" target="_blank" rel="noopener"> LAUNCH ZOOM SESSION</a><a class="ig-title" href="#" target="_blank" rel="noopener"></a></div>
      </div>
      </div>
      </li>
      <li v-for="(week, index) in weeks">
      <div class="ig-row">
      <div class="ig-row__layout">
      <div class="ig-type-icon" aria-hidden="true"><i class="icon-group"></i></div>
      <div class="ig-info"><a href=""> Class Session {{index+1}} Recording</a></div>
      </div>
      </div>
      </li>



      </ul>
      </div>
      </div>
      </div>


   
    </div>

</template>

<script>
import PageMixin from "../../components/mixins/page-mixin"
var moment = require("moment")
import WeeklyVideo from "../weekly/WeeklyVideo"
import WeeklyDiscussion from "../weekly/WeeklyDiscussion"
import WeeklyAssignment from "../weekly/WeeklyAssignment"

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
    }
  },
  methods: {
    returnCode() {
      console.log("week code..")
      let code = document.getElementById("zoom-code")
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
  mixins: [PageMixin],
  components: {
    WeeklyVideo,
    WeeklyDiscussion,
    WeeklyAssignment
  }
}
</script>

<style lang="css">
</style>
