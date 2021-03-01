<template>
  <div :id="sid" class="row list-slot">
    <component class="col-md-6"
               :is="slotData.component"
               v-for="item in data.items"
               :key="item.id"
               :sid="'professor-ta-slot-' + item.id"
               :slotData="item"
               :slotItem="item"/>
  </div>
</template>

<script>

import Vue from 'vue'
import ProfessorTaSlot from './ProfessorTaSlot.vue'
<<<<<<< Updated upstream

export default {
  components: {
    ProfessorTaSlot
=======
import CaseSlot from './CaseSlot.vue'
import StudentSlot from './StudentSlot.vue'
import slotMixin from '../mixins/slot-mixin.js'

export default {
  components: {
    ProfessorTaSlot, CaseSlot, StudentSlot
>>>>>>> Stashed changes
  },
  name: "ListSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
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
    getter2Data: function () {
      if(!this.slotItem.getter2) return null
      return this.$store.getters.getFromGetter(this.slotItem.getter2)
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

          newVal.forEach((val, i) => {
            newVal[i].type = 'Instructor'
          })

          if(!newVal) newVal = []

          if(!this.getter2Data) Vue.set(this.data, 'items', newVal)
          else Vue.set(this.data, 'items', newVal.concat(this.getter2Data))
        }
      },
      immediate: true
    },
    getter2Data: {
      handler(newVal) {
        if (newVal !== null) {
          if(!this.data) {
            this.data = {}
          }

          newVal.forEach((val, i) => {
            newVal[i].type = 'TA'
          })

          if(!newVal) newVal = []

          Vue.set(this.data, 'items', this.getterData.concat(newVal))
        }
      },
      immediate: true
    }
  },
  methods: {
    deleteSlot() {
      this.$store.dispatch("setDialogData", {
        title: 'Are you sure you want to delete this slot?',
        type: 'delete-slot',
        sid: this.sid
      })
      this.$store.dispatch("setDialogVisibility", true)
    }
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

.col {
  display: flex;
}

</style>
