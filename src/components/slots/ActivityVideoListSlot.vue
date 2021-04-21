<template>
<div>
  <div class="content-box" v-for="video in itemList" :key="video.id">
    <transition name="fade">

    <div v-if="!getInfo.isBlended" class="grid-row top-xs">
      <div class="col-xs-4">
        <div class="styleguide-section__grid-demo-element">
          <video-slot 
          :slotData="{width: 300, height: 150}"
          :slotItem="{getter: {videoSrc: getWeekItemPropGetter('source', 'videos', video.id)}}"/>
        </div>
      </div>
      <div class="col-xs-8">
        <div class="styleguide-section__grid-demo-element">
          <span class="STV1_Welcome" @dblclick="setEditing('title1')" v-if="editing !== 'title1'" > VIDEO: {{video.title}} </span>
          <span data-hidden v-else>
            <input ref="title1" @blur="finishEditing('title')" v-model="data[video.id].title" />
          </span> 
          <br>
          <div v-html="video.description" v-if="editing !== 'description1'" @dblclick="setEditing('description1')" />
          <div data-hidden v-else>
          <quill-editor ref="description1"
                        v-model="data[video.id].description"
                        :config="editorOption" />
          <button class="btn btn-success" @click="finishEditing('description', video.id)">
            Save changes
          </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="getInfo.isBlended" class="grid-row top-xs">
      <div class="col-xs-6">
        <div class="styleguide-section__grid-demo-element">
          <video-slot 
          :slotData="{}"
          :slotItem="{getter: {videoSrc: getWeekItemPropGetter('source', 'videos', video.id)}}"/>
        </div>
      </div>

      <div class="col-xs-6">
        <blockquote :style="{borderLeft: '4px solid' + primary}" style="height: 300px; font-weight: normal; font-size: 16px; font-style: inherit;">
        <div class="styleguide-section__grid-demo-element">
          <div :style="{background: primary, fontSize: '14px', padding: '12px', color: '#FFFFFF'}" 
          @dblclick="setEditing(video.id + 'title')" v-if="editing !== video.id + 'title'" >{{video.title}}</div>
          <span data-hidden v-else>
            <input ref="title" @blur="finishEditing('title', video.id)" v-model='data[video.id].title' />
          </span> 
          <br>
          <div v-html="video.description" v-if="editing !== video.id + 'description'" @dblclick="setEditing(video.id +'description')" />
          <div data-hidden v-else>
          <quill-editor ref="description"
                        :value="video.description"
                        v-model="data[video.id].description"
                        :config="editorOption" />
          <button class="btn btn-success" @click="finishEditing('description', video.id)">
            Save changes
          </button>
          </div>
        </div>
        </blockquote>
      </div>
    </div>
  </transition>
</div>
</div>

  
</template>

<script>

import slotMixin from '../mixins/slot-mixin.js'
import VideoSlot from './VideoSlot'
import TitleSlot from './TitleSlot'
import ContentSlot from './ContentSlot'
import { quillEditor } from "vue-quill-editor"


import { mapActions, mapGetters } from 'vuex'

const toolbarOptions = [
  ["bold", "italic", "underline"],
  ["blockquote", { list: "ordered" }, { list: "bullet" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }, "clean"],
  ["link"]
]


export default {
  name: "ActivityVideoListSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  components: {
    VideoSlot, TitleSlot, ContentSlot, quillEditor
  },  
  data() {
    return {
      editing: null,
      data: {
      },
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      },
      primary: this.$store.getters.getTheme.primary,
      editableProps: ['weekID', 'type']
    }
  },
  computed: {
    ...mapGetters(['getWeekPropByID', 'getWeekItemPropGetter','getInfo','getWeekItemPropByID', 'getSessionPropByID']),
    itemList: function(){
        let videos = this.getSessionPropByID('videos', this.data.weekID).get
        videos.forEach( video => {
          this.data[video.id] = video
        })
        return videos
      }
  },
  watch: {
  },
  methods: {
    finishEditing(field, id) {
        this.$store.dispatch("updateSlotDataWithSetter", {
          setter: this.getWeekItemPropByID(field, 'videos', id).set,
          data: this.data[id][field]
        }) 
        this.editing = null
      
    },
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  padding: 12px;
  color: #333;
}

button {
  margin-right: 7px;
}

</style>
