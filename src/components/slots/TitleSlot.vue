<template>
  <div :id="sid" ref="slotcontainer" class="col">
    <!-- <div :class="data.type" v-if="editing !== 'title'" @dblclick="setEditing('title')">
      {{ data.title }}
    </div> -->

    <component :is="data.type" v-if="editing !== 'title'" @dblclick="setEditing('title')">
      <a :href="createLink(data.link)" @click="doNothing"
    :style="(!data.link && !data.linkID) ? 'cursor: context-menu;color: black; text-decoration: underlined;' : 'color: black; text-decoration: underlined;'"> {{data.prepend + data.title }} </a>
    </component>
    <span data-hidden v-else>
      <input ref="title" v-model="data.title" :class="'font-' + data.type" />
      <select v-model="data.type" :class="'font-' + data.type">
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="h4">H4</option>
        <option value="h5">H5</option>
        <option value="h6">H6</option>
        <option value="custom">Custom</option>
      </select>
      <button class="btn btn-primary" :class="'font-' + data.type" @click="finishEditing('title')">
        Save changes
      </button>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import slotMixin from '../mixins/slot-mixin.js'

let defaultVals = {
        title: 'Default Title',
        type: 'h1',
        prepend: ''
      }

export default {
  name: "TitleSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],  
  data() {
    return {
      editing: null,
      data: this.slotData ? {...defaultVals  ,...this.slotData} : defaultVals
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

input {
  margin-bottom: 12px;
}

input, select {
    padding: 0 12px;
    font-size: 18px;
    font-weight: 200;
    border: none;
    letter-spacing: -1px;
    color: #333;
    margin: 0;
    background: #00000022;
    display: inline-block;
    vertical-align: middle;
}

button {
  font-size: 16px !important;
}

input, select, button {
    &.font-h1 {
      font-size: 2.625rem;
      height: 64px;
    }

    &.font-h2 {
      font-size: 2rem;
      height: 52px;
    }

    &.font-h3 {
      font-size: 1.5rem;
      height: 52px;
    }

    &.font-h4 {
      font-size: 1.25rem;
      height: 52px;
    }

    &.font-h5 {
      font-size: 16px;
      height: 48px;
    }

    &.font-h6 {
      font-size: 0.875rem;
      height: 44px;
    }
}

select {
  padding: 7px 16px;
  margin: 0 12px;
  text-align: center;

  option {
    font-size: 16px;
    background: #FFF;
  }
}

.small-col {
  input {
    width: 100%;
    display: block;
    margin-bottom: 12px;

    &.font-h4, &.font-h5, &.font-h6 {
      display: inline-block;
      width: 48%;
      margin-right: 1%;
    }
  }

  select {
    width: 100%;
    display: block;
    margin: 0 0 12px;

    &.font-h4, &.font-h5, &.font-h6 {
      display: inline-block;
      width: 48%;
    }
  }

  button {
    height: 44px;
    margin-right: 7px;
  }
}

</style>
