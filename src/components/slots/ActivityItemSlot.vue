<template>
  <div :id="sid"  class="ig-row ig-published">
      <div class="ig-row__layout">
          <div class="ig-type-icon" aria-hidden="true"><i :class="iconType"></i></div>
          <div class="ig-info">
            <a class="ig-title" :href="data.link" @click="doNothing" :data-api-endpoint="data.link" :data-api-returntype="data.type">
              <span data-dbclick @dblclick="setEditing('title')" v-if="editing !== 'title'" > {{data.title}} </span>
              <span data-hidden v-else>
                <input ref="title" @blur="finishEditing('title')" v-model="data.title" />
              </span>
            </a>
            <div class="ig-details">
                <div class="ig-details__item">
                <name-value-slot
                  :sid="'name-value-' + this.sid"
                  :slotData='{type: "date", name: "Due", value: data.due ,nameStyle: {"font-weight": "bold"}}'
                  :slotItem='{
                    getter: {
                      value: testGetter
                    }}'
                   />
                </div>

              <!-- <div class="ig-details__item">{{data.points}} pts</div> -->
            </div>
          </div>
      </div>
  </div>
</template>

<script>

import slotMixin from '../mixins/slot-mixin.js'
import NameValueSlot from './NameValueSlot.vue'
import TitleSlot from './TitleSlot.vue'

import { mapActions, mapGetters } from 'vuex'


export default {
  name: "ActivityItemSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  components: {
    NameValueSlot,
    TitleSlot
  },
  data() {
    return {
      editing: null,
      data: {},
    }
  },
  computed: {
    ...mapGetters(['getWeekItemPropGetter','getWeekItemPropByID']),
    iconType: function() {
      return 'icon-' + this.data.type
    },
    testGetter: function() {
      return this.getWeekItemPropGetter('due', this.data.type + 's', this.data.id)
    },
    testValue: function() {
      return this.getWeekItemPropByID('due', this.data.type + 's', this.data.id)
    }
  },
  watch: {
  },
  methods: {
    finishEditing(field) {
      if (this.data[field]) {
        this.$store.dispatch("updateSlotDataWithSetter", {
          setter: this.getWeekItemPropByID(field, this.data.type + 's', this.data.id).set,
          data: this.data[field]
        })
        this.editing = null
      }
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
  margin-top: 16px;
  margin-right: 7px;
}

</style>
