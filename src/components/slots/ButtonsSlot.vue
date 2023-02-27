<template>
  <div :id="sid" class="col button-slot">
    <template v-for="button in data.buttons" >
      <a :href="createLink(button.to)" @click="doNothing" :key="button.label" class="Button" role="button" style="margin-right: 7px;">
        {{ button.label }}
      </a>
    </template>
  </div>
</template>

<script>

import slotMixin from '../mixins/slot-mixin.js'

export default {
  name: "ButtonsSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],  
  data() {
    return {
      editing: null,
      data: this.slotData,
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  color: #333;
}

Button {
  margin-right: 7px;
}

</style>
