<template>
  <div :id="sid"  class="ig-row ig-published">
    <div class="STV1_SlimBanner">
      <p>PICKER CENTER CASE COLLECTION</p>
    </div>
    <div class="content-box">
      <div class="grid-row">
        <div class="col-xs-12 col-md-12 col-lg-6">
          <div class="styleguide-section__grid-demo-element">
            <video-slot :slotData="{width: 300, height: 150, videoSrc: data.videoCase}" :slotItem="{}"/>
          </div>
        </div>
        <div class="col-xs-12 col-md-12 col-lg-6">
          <div class="styleguide-section__grid-demo-element">
            <h3 style="margin-bottom: 5px; margin-top: 0;"><i class="icon-folder"></i>&nbsp;{{data.name}}</h3>
            <p>{{data.description}}</p>
           <a class="instructure_file_link instructure_scribd_file" title="Case Study"
                :href="data.writtenCase"
                :data-api-endpoint="data.writtenCase"
                data-api-returntype="File"><button>Case Study Document</button></a> <a class="instructure_file_link instructure_scribd_file"
                title="Original Documents"
                :href="data.originalDocuments"
                :data-api-endpoint="data.originalDocuments"
                data-api-returntype="File"><button>Original Documents</button></a> <a class="instructure_file_link instructure_scribd_file"
                title="Transcripts"
                :href="data.transcripts"
                :data-api-endpoint="data.transcripts"
                data-api-returntype="File"><button>Transcripts</button></a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.aditionalInterviews.length > 0">
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
        <div class="col-xs-12 col-lg-4" v-for="interview in data.aditionalInterviews" :key="interview">
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
</template>

<script>

import slotMixin from '../mixins/slot-mixin.js'
import NameValueSlot from './NameValueSlot.vue'
import TitleSlot from './TitleSlot.vue'
import VideoSlot from './VideoSlot.vue'

import { mapActions, mapGetters } from 'vuex'


export default {
  name: "Case Slot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  components: {
    NameValueSlot,
    TitleSlot,
    VideoSlot
  },  
  data() {
    return {
      editing: null,
      data: {},
      editableProps: ['type', 'item', 'index']
    }
  },
  computed: {
    ...mapGetters(['getWeekItemPropGetter','getWeekItemPropByID']),
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  padding: 12px;
  color: #333;
}

button {
  margin-top: 16px;
  margin-right: 7px;
}

</style>
