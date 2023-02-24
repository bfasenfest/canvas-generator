<template>
  <div :id="'week-box'+idx" >
  <div class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
    <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]"  style="width: 1054px;">
      <p>{{info.title.toUpperCase()}}</p>
    </div>
    <div class="grid-row">
      <div class="col-xs-12 col-lg-12">
        <div class="ic-image-text-combo">
          <div class="ic-image-text-combo__text">
            <div class="pad-box-mini">
              <h3 style="margin-bottom: 5px;">
                <i class="icon-clock"></i> {{info.classType.dateType}} {{idx + 1}}: {{weeks[idx].title}}</h3>
              </div>
              <div class="pad-box-mini border border-b border-t">
                <p v-html="weeks[idx].body"></p>
                <!-- <div class="pad-box-mini">
                  <span v-html="weeks[idx].required" >
                  </span>
                </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- The videos, discussions, and assignments are all built into their own smaller components to keep it more organized
    They are WeeklyDiscussion.vue, WeeklyAssignment.vue, and WeeklyVideo.vue respectively. -->
    <weekly-video  v-for="(video, index) in weeks[idx].videos" :data="video" :index="index+1" :key="video.source"> </weekly-video>

     <div  v-if="weeks[idx].cases.length > 0">

        <div v-for="caseStudy in weeks[idx].cases">
        <div class="STV1_SlimBanner">
          <p>PICKER CENTER CASE COLLECTION</p>
        </div>
        <div class="content-box">
          <div class="grid-row">
            <div class="col-xs-12 col-md-12 col-lg-6">
              <div class="styleguide-section__grid-demo-element">
                <div class="embed-container"><iframe :src="caseStudy.videoCase" width="300" height="150"
                    allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen"
                    mozallowfullscreen="mozallowfullscreen"></iframe></div>
              </div>
            </div>
            <div class="col-xs-12 col-md-12 col-lg-6">
              <div class="styleguide-section__grid-demo-element">
                <h3 style="margin-bottom: 5px; margin-top: 0;"><i class="icon-folder"></i>&nbsp;{{caseStudy.name}}</h3>
                <p>{{caseStudy.description}}</p>
               <a class="instructure_file_link instructure_scribd_file" title="Case Study"
                    :href="caseStudy.writtenCase"
                    :data-api-endpoint="caseStudy.writtenCase"
                    data-api-returntype="File"><button>Case Study Document</button></a> <a class="instructure_file_link instructure_scribd_file"
                    title="Original Documents"
                    :href="caseStudy.originalDocuments"
                    :data-api-endpoint="caseStudy.originalDocuments"
                    data-api-returntype="File"><button>Original Documents</button></a> <a class="instructure_file_link instructure_scribd_file"
                    title="Transcripts"
                    :href="caseStudy.transcripts"
                    :data-api-endpoint="caseStudy.transcripts"
                    data-api-returntype="File"><button>Transcripts</button></a>
              </div>
            </div>
          </div>
        </div>
        <div v-if="caseStudy.aditionalInterviews.length > 0">
        <div class="content-box">
          <div class="grid-row">
            <div class="col-xs-12 col-lg-12">
              <div class="styleguide-section__grid-demo-element">
                <div class="STV1_Welcome">ADDITIONAL INTERVIEWS</div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-box">
          <div class="grid-row">
            <div class="col-xs-12 col-lg-4" v-for="interview in caseStudy.aditionalInterviews">
              <div class="styleguide-section__grid-demo-element">
                <div class="embed-container"><iframe :src="interview" width="300" height="150"
                    allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen"
                    mozallowfullscreen="mozallowfullscreen"></iframe></div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>

    <div class="item-group-container" style="padding-bottom: 0;" v-if="weeks[idx].assignments.length > 0 || weeks[idx].discussions.length > 0">
      <div class="item-group-condensed">
        <ul id="cond_group_1" class="ig-list">
        <weekly-discussion  v-for="(disc, index) in weeks[idx].discussions" :data="disc" :index="index+1" :key="disc.link"> </weekly-discussion>
        <weekly-assignment  v-for="(assign, index) in weeks[idx].assignments" :data="assign" :index="index+1" :key="assign.link"> </weekly-assignment>
        </ul>
      </div>
    </div>

  </div>
  </div>

</template>

<script>
import PageMixin from "../../components/mixins/page-mixin"
var moment = require("moment")
import WeeklyVideo from "../weekly/WeeklyVideo.vue"
import WeeklyDiscussion from "../weekly/WeeklyDiscussion.vue"
import WeeklyAssignment from "../weekly/WeeklyAssignment.vue"

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
      let code = document.getElementById("week-box" + this.idx)
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
