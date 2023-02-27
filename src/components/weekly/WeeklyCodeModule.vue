<template>
  <div>
    <div class='uk-text-center'>
      <el-button size="large" type="primary" style="display: inline-block; margin-top: 5px;" @click="fn">Add New <slot></slot></el-button>
      <el-button size="large" type="danger" style="display: inline-block; margin-top: 5px;" @click="clear">Clear</el-button>
    </div>
    <hr>
    <div v-if="content.length > 0" >

      <div class="uk-text-center drop-down">
        <select v-model="index" class="uk-select uk-form-width-small">
          <option v-for="n in content.length" :value="n"><slot></slot> {{n}}</option>
        </select>
        <button type="button" name="button" class="uk-button-small uk-button-primary" @click="editable = !editable">{{ editable ? "Save" : "Edit" }}</button>
        <button v-show="editable" type="button" class="uk-button-small uk-button-danger center" name="button" @click="remove"> Delete</button>
      </div>
      <transition name="fade">

      <div v-show="editable">
        <div class="code-input uk-text-center uk-margin-small-top" v-for = "input in inputs">
          <label for="text-area">{{capitalize(input)}}</label>
          <el-date-picker
            v-if = "input == 'due'"
            style="margin: 10px; margin-bottom:20px"
            :value="currentItem[input]"
            @input="modify(currentItem, input, $event, true)"
            type="date"
            placeholder="Pick start date">
          </el-date-picker>

          <textarea v-else :value="currentItem[input]" @input="modify(currentItem, input, $event)" id="text-area" class="uk-textarea" rows="2" cols="50"></textarea> <br>
        </div>
      </div>
       </transition>
      <hr>


    </div>

   
  </div>

</template>

<script>
import PageMixin from "../../components/mixins/page-mixin"
import _ from 'lodash'

export default {
  data() {
    return {
      index: 1,
      editable: false
    }
  },
  computed: {
    currentItem() {
      return this.content[this.index - 1]
    }
  },
  methods: {
    clear() {
      this.$emit("clearArr")
      console.log("clearing...")
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    remove() {
      this.content.splice(this.index - 1, 1)
    },
    modify(item, input, event, isDate = false) {
      console.log(event)
      // let week = _.cloneDeep(this.$store.getters.getWeeks()[this.selected])
      let prop = _.cloneDeep(this.$store.getters.getWeeks[this.idx][this.property])
      prop[this.index - 1][input] = isDate ? event : event.target.value

      console.log(prop[this.index - 1][input])
      console.log(this.property)
      this.updateWeek(this.idx, this.property, prop)
    }
  },
  props: ["content", "fn", "inputs", "property", "idx"],
  mixins: [PageMixin]
}
</script>

<style lang="css">
.add-weekly {
  margin-top: 20px;
}

.drop-down {
  margin-bottom: 10px;
}

textarea {
  margin-bottom: 10px;
  width: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

 {
  opacity: 0;
}
</style>
