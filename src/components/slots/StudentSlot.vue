<template>
      <div class="content-box">
        <div class="grid-row">

        <div style="float: left; display: inline; width: 18%; height: auto; background-color: #f7f7f7; color: #333333; margin: 20px 20px 0; padding: 10px;">
          <a @click="doNothing" :href='url + "pages/student-" + data.id'>
            <image-slot 
                :sid="'image-' + this.sid"
                class="STV1_SyllabusPhoto"
                :slotData='{imgSrc: data.imgSrc, width: 200, height:200, }'
                :slotItem='{data:{imgSrc: data.imgSrc, width: 200, height:200}}'
                />          
          </a>
          <p style="padding-top: 10px; margin: 0 10px; color: #666666; font-size: 14px; font-weight: bold;">{{data.name}}</p>
          <p style="margin: 0 10px; color: #999999; font-size: 12px; font-weight: normal;">{{data.company}}</p>
        </div>
        
        </div>
      </div>
</template>

<script>

import Vue from 'vue'
import slotMixin from '../mixins/slot-mixin.js'
import ImageSlot from './ImageSlot'

export default {
  name: "Student Slot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  components: {
    ImageSlot
  },  
  data() {
    return {
      editing: null,
      data: {},
    }
  },
  computed: {
    getterData: function () {
      if(!this.slotItem.getter) return null
      return this.$store.getters.getFromGetter(this.slotItem.getter)
    }
  },
  watch: {
    slotData: {
      handler(newVal) {
        this.data = newVal
      },
      immediate: true
    },
    getterData: {
      handler(newVal) {
        if (newVal !== null) {
          if(!this.data) {
            this.data = {}
          }

          Vue.set(this.data, 'items', newVal ? newVal : [])
        }
      },
      immediate: true
    }
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
