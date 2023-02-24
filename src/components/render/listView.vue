<template>
<div id="list-code">
  <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
    <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]"  style="width: 1054px;">
      <p>{{info.title.toUpperCase()}}</p>
    </div>
    <div class="grid-row">
      <div class="col-xs-12 col-lg-12">
        <div class="ic-image-text-combo">
          <div class="ic-image-text-combo__text">
            <div class="pad-box-mini">
              <h3 style="margin-bottom: 5px;">
                <i class="icon-clock"></i> {{activitiesTitle.toUpperCase()}} ACTIVITIES</h3>
            </div>
            <div class="pad-box-mini border border-b border-t">
              <p>Welcome to the {{activitiesTitle}} Activities page! Below you'll find an overview of all {{numWeeks}} lectures,
                each covering a distinct topic in the field of {{info.title}}. Clicking on a {{info.classType.dateType.toLowerCase()}} will
                take you to a page where you can watch the entire lecture and complete the activities related to that lecture.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Generates a weekly list html element for each activity in the weeklyActivities array in the vue data.
    See the WeeklyListItem.vue file in components for the html and styling. -->

    <weekly-list-item v-if="weeks.length > 0"
      v-for="(activity, index) in weeks"
      :data="activity"
      :linked="info.useLinks"
      :index="index+1">
    </weekly-list-item>

  </div>
</div>

</template>

<script>
import PageMixin from "../../components/mixins/page-mixin"
import WeeklyListItem from "../weekly/WeeklyListItem"

export default {
  data() {
    return {
      index: 1,
      editable: false
    }
  },
  computed: {
    activitiesTitle() {
      if (this.info.classType.dateType == "Session") return "Session"
      return this.info.classType.dateType == "Week" ? "Weekly" : "Daily"
    },
    // Changes the description wording so that it matches the current number of weeks on the page
    numWeeks() {
      let num = this.weeks.length

      var a = [
        "",
        "one ",
        "two ",
        "three ",
        "four ",
        "five ",
        "six ",
        "seven ",
        "eight ",
        "nine ",
        "ten ",
        "eleven ",
        "twelve ",
        "thirteen ",
        "fourteen ",
        "fifteen ",
        "sixteen ",
        "seventeen ",
        "eighteen ",
        "nineteen "
      ]
      var b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

      if ((num = num.toString()).length > 9) return "overflow"
      let n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/)
      if (!n) return
      var str = ""
      str += n[1] != 0 ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore " : ""
      str += n[2] != 0 ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh " : ""
      str += n[3] != 0 ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand " : ""
      str += n[4] != 0 ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred " : ""
      str += n[5] != 0 ? (str != "" ? "and " : "") + (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) : ""
      return str
    }
  },
  methods: {
    returnCode() {
      console.log("returning list code...")
      this.updateProp("url", this.parseUrl(this.info.url))
      let code = document.getElementById("list-code")
      return code.innerHTML.replace(/\bdata-v-\S+\"/gi, "")
    },
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
    modify(item, input, event) {
      // let week = _.cloneDeep(this.$store.getters.getWeeks()[this.selected])
      let prop = _.cloneDeep(this.$store.getters.getWeeks[this.idx][this.property])
      prop[this.index - 1][input] = event.target.value

      console.log(prop[this.index - 1][input])
      console.log(this.property)
      this.updateWeek(this.idx, this.property, prop)
    }
  },
  props: ["content", "fn", "inputs", "property", "idx"],
  components: {
    WeeklyListItem
  },
  mixins: [pagemixin]
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

.alert {
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
}

textarea {
  width: auto;
}

.quill {
  width: 700px;
  margin: auto;
}

el-tab-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: "blue";
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.textbox {
  margin-left: 40px;
}

.limiter {
  width: 1000px;
  margin: auto;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  margin-right: 30px;
  width: 30%;
}

#copy-text-area {
  width: 100%;
}

.GFbanner {
  height: 190px;
}

.STV1_Banner {
  height: 190px;
}
</style>
