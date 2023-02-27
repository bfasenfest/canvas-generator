<template>
  <div class="dialog-inner">

    <div class="dialog-content">
      <label v-if="data.title">Title:
        <input class="form-control" @blur="finishEditing('title')" ref="title" v-model="data.title" placeholder="Course Title">
      </label>
      <label v-if="data.semester">Semester:
        <input class="form-control" @blur="finishEditing('semester')" ref="semester" v-model="data.semester" placeholder="Semester">
      </label>
      <label>
        Banner Image:
        <select style="display: inline-block; width:150px" v-model="theme" name="Choose Banner" class="uk-select">
          <option selected disabled>Choose Banner</option>
          <option v-for="theme in themeOptions" :value="theme" :key="theme.option">{{theme.option}}</option>
        </select>
      </label>
    </div>

    <footer>
      <el-button type="primary" @click="saveChoice">Confirm</el-button>
    </footer>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import _ from 'lodash'

import slotTypes from '../../../util/slot-types.js'
import slotMixin from '../../mixins/slot-mixin.js'

export default {
  props: [
    'dialogData'
  ],
  name: 'BannerSlotData',
  mixins: [slotTypes, slotMixin],
  data() {
    return {
      selectedSlot: 1,
      data: {},
      slotItem: {},
      slotData: {}
    }
  },
  watch: {
    dialogData: {
      handler(val) {
        this.slotItem = val.slotData
        this.slotData = val.slotData.data
      },
      deep: true,
      immediate: true
    }
  },
  computed:{
    ...mapGetters({
      fullSlotTypes: 'getSlotTypes',
      Config: 'getConfig',
      getTheme: 'getTheme',
      defaultOptions: 'getThemeOptions'
    }),
    theme: {
      get() {
        return this.getTheme
      },
      set(payload) {
        this.$store.commit('updateTheme', payload)
      }
    },
    themeOptions(){
      // return this.themeOptions
      if (this.Config.themes.visible == '*'){
        return _.pickBy(this.defaultOptions, (theme, key) => {
          return !_.includes(this.Config.themes.hidden, theme.option)
        })
      }
      else {
        return _.pickBy(this.defaultOptions, (theme, key) => {
          return _.includes(this.Config.themes.visible, theme.option)
        })
      }
    }
  },
  methods: {
    saveChoice() {
      this.$store.dispatch("setDialogVisibility", false)
    }
  }
}
</script>

<style lang="scss" scoped>

.dialog-content {
  text-align: center;
  padding: 0 12px;
  margin-bottom: 18px;
  max-height: calc(80vh - 124px);
  overflow: auto;

  label {
    width: 100%;
    text-align: left;
    padding-bottom: 16px;

    input {
      margin-top: 7px;
      font-weight: normal;
    }
  }
}

footer {
  margin: 30px 0 -10px;
  text-align: right;
}

</style>
