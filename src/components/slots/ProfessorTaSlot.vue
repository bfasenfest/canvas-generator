<template>
  <div :id="sid" class="professor-ta-slot" style="display: inline-block; width: 49%;">
    <div class="pad-box-mini border border-tl">
      <div class="STV1_ProfileBG color-columbia-blue" :style="{background:getTheme.primary}">
      <!-- <img :src="data.imgSrc" class="STV1_SyllabusPhoto"> -->
      <image-slot
        :sid="'image-' + this.sid"
        class="STV1_SyllabusPhoto"
        :slotData='{imgSrc: data.imgSrc, width: 200, height:200, }'
        :slotItem='{data:{imgSrc: data.imgSrc, width: 200, height:200}, setters:{imgSrc: imageSetter}}'
        />
        </div>
        <p>{{ data.type }}:</p>
        <p>
          <span data-dbclick @dblclick="setEditing('name')" v-if="editing !== 'name'" >{{ data.name }}</span>
          <span data-hidden v-else>
            <input ref="name" @blur="finishEditing('name')" v-model="data.name" />
          </span>
          <span data-dbclick @dblclick="setEditing('email')" v-if="editing !== 'email'">(<a @click="doNothing" :href="'mailto:' + data.email" v-if="data.email">{{ data.email }}</a>) </span>
          <span data-hidden v-else>
            <input ref="email" @blur="finishEditing('email')" v-model="data.email" />
          </span>
          <br>
          <!-- Office Hours:  -->
          <span data-dbclick @dblclick="setEditing('office')" v-if="editing !== 'office'" > {{ data.office }} </span>
          <span data-hidden v-else>
            <input ref="office" @blur="finishEditing('office')" v-model="data.office" />
          </span>
        </p>
      </div>
  </div>
</template>

<script>

import Vue from 'vue'
import slotMixin from '../mixins/slot-mixin.js'
import ImageSlot from './ImageSlot.vue'
import _ from 'lodash'


export default {
  name: "ProfessorTaSlot",
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
    },
    imageSetter: function() {
      let index
      switch (this.data.type){
         case "Professor":
           index = _.findIndex(this.info.profs, {id: this.data.id})
           return `info.profs[${index}].imgSrc`
           break;
          case 'Teaching Assistant':
            index = _.findIndex(this.info.tas, {id: this.data.id})
            return `info.tas[${index}].imgSrc`
            break;
          default:
            return 0
      }


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
