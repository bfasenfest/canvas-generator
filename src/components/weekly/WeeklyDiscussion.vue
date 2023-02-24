<template>
  <transition name="fade">
    <li>
      <div class="ig-row ig-published">
        <div class="ig-row__layout">
          <div class="ig-type-icon" aria-hidden="true">
            <i class="icon-discussion"></i>
          </div>
          <div class="ig-info"><a class="ig-title" :href="data.link" :data-api-endpoint="data.link" data-api-returntype="Discussion"> Discussion {{index}}</a>
            <div class="ig-details">
              <div class="ig-details__item"><strong>Due</strong> {{formatWeek(data.due)}}</div>
              <!-- <div class="ig-details__item">{{data.points}} pts</div> -->
            </div>
          </div>
        </div>
      </div>
    </li>
  </transition>
</template>

<script>
var moment = require("moment")

export default {
  data() {
    return {
      url: this.$store.state.info.url
    }
  },
  props: ["data", "index"],
  methods: {
    formatWeek(date) {
      return moment(date).format("dddd, MMMM Do")
    }
  }
}
</script>

<style lang="css">
</style>
