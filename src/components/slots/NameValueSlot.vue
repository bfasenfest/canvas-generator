<template>
  <div :id="sid" class="col name-value-slot" v-if="data.value !== 'hidden'">
    <a :href="createLink(data.link)" @click="doNothing"
    :style="(!data.link && !data.linkID) ? 'cursor: context-menu;color: black; text-decoration: none;' : 'color: black; text-decoration: none;'">
    <span :style="data.nameStyle">{{ data.name}}:</span>
    <span v-for="n in data.breakSize" :key="n"> <br> </span>
    <span v-if="data.type == 'date'">
      <span data-dbclick @dblclick="setEditing('value')" v-if="editing !== 'value'" > {{ formatWeek(data.value) }} </span>
      <span data-hidden v-else>
        <el-date-picker
          ref="value"
          v-model="data.value"
          @blur="finishEditing('value')"
          type="date"
          placeholder="Pick date">
        </el-date-picker>
      </span>
    </span>
    <span v-else>
      <span data-dbclick @dblclick="setEditing('value')" v-if="editing !== 'value'" > {{ data.value }} </span>
      <span data-hidden v-else>
        <input ref="value" @blur="finishEditing('value')" v-model="data.value" />
      </span>
    </span>
    </a>
  </div>
</template>

<script>

import Vue from 'vue'
import moment from 'moment'
import slotMixin from '../mixins/slot-mixin.js'

export default {
  name: "NameValueSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  data() {
    return {
      editing: null,
      data: {
      },
      setters: {
      },
      defaultGetter: 'value',
      editableProps: ['name', 'type', 'value', 'nameStyle']
    }
  },
  computed: {
  },
  watch: {

  },
  methods: {
    isDate(value){
      return moment.isMoment(value)
    }
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  padding: 12px;
  color: #333;
}

.has-pointer {
  color: black;
  cursor: context-menu;
  text-decoration: none;
}

button {
  margin-top: 16px;
  margin-right: 7px;
}

</style>
