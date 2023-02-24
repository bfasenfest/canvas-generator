<template>
<transition name="fade">
  <div v-if="itemList.length>0" class="item-group-container" style="padding-bottom: 0px;">
    <div class="item-group-condensed">
        <ul id="cond_group_1" class="ig-list">
          <li v-for="item in itemList" :key="item.id">
            <activity-item-slot 
            :slotData="item"
            :slotItem="{}"/>
          </li>
        </ul>
     </div>
  </div>
  </transition>

</template>

<script>

import slotMixin from '../mixins/slot-mixin.js'
import ActivityItemSlot from './ActivityItemSlot.vue'

import { mapActions, mapGetters } from 'vuex'


export default {
  name: "ActivityItemListSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  components: {
    ActivityItemSlot,
  },  
  data() {
    return {
      editing: null,
      data: {},
      editableProps: ['weekID', 'type']
    }
  },
  computed: {
    ...mapGetters(['getWeekPropByID']),
    itemList: function(){
      if (this.data.type == "all") {
        let discussions = this.getWeekPropByID('discussions', this.data.weekID).get
        let assignments = this.getWeekPropByID('assignments', this.data.weekID).get
        return discussions.concat(assignments)
      }
      else {
        let list = this.getWeekPropByID(this.data.type + 's', this.data.weekID)
        return list.get
      }
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  color: #333;
}

button {
  margin-right: 7px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}

</style>
