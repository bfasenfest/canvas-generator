<template>
  <div class="activity-page">
    <div class="code-container">
      <hr>
      <div class="textbox-container">
        <el-card class="card box-card">
          <br>
          <div slot="header" class="clearfix">
            <span class="big-text">Edit Info</span>
            <el-select v-model="selected" placeholder="Select" value-key="key" style="width: 180px; margin-left: 10px">
              <el-option-group
                key="students"
                label="Students">
                <el-option
                  v-for="(student, index) in info.students"
                  :key="student.id"
                  :label="student.name"
                  :value="{index, key: student.id}">
                </el-option>
              </el-option-group>

            </el-select>
          </div>
          <hr>
        </el-card>
      </div>
      <div class="canvas-code">
        <container-component cid="newstudent" :defaultRows="defRows"/>
      </div>            
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex"
import { quillEditor } from "vue-quill-editor"
import ContainerComponent from '../common/ContainerComponent.vue'
import PageMixin from "../../components/mixins/page-mixin"
import RowTypes from '../../util/row-types.js'
import moment from "moment"

var toolbarOptions = [
  ["bold", "italic", "underline"],
  [
    "blockquote",
    {
      list: "ordered"
    },
    {
      list: "bullet"
    }
  ],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ script: "sub" }, { script: "super" }],
  ["link", "clean"]
]

export default {
  name: "Activity",
  data() {
    return {
      videoEditable: false,
      showEditor: false,
      videos: [],
      discussions: [],
      assignments: [],
      outputCode: "",
      // editor: ClassicEditor,
      editorConfig: {},
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    ContainerComponent,
  },
  computed: {
    ...mapGetters(["getInfo", "getDWeek", "getWeeks", "getCases"]),
    selected(){
      return this.getWeekIndexByID(this.getSelectedWeekID)
    },
    defRows(){
      return [
        // [this.simpleBannerCol({banner: {getter: {title: 'info.title'}}})],
      ]
    },
  },
  mixins: [RowTypes, PageMixin],
  methods: {
    getSaveStateConfig() {
      return {
        cacheKey: "Weekly"
      }
    }
  },
  mounted(){

  }
}
</script>

<style scoped lang="scss">
h1,
h2 {
  font-weight: normal;
}

textarea {
  width: auto;
}

.home-bar {
  width: 50vw;
}

.code-module {
}

.show-editor {
  height: 40px;
  margin-bottom: 10px;
  margin-left: 30%;
  margin-right: 30%;
}

.textbox-container {
  width: 40%;
  margin-top: 20px;
}

.input-element {
  clear: both;
  display: block;
}

.code-input {
  margin: 10px;
}

.quill {
  width: 80%;
  margin-bottom: 25px;
  margin: auto;
}

#canvas-code {
  width: 1090px;
  margin: auto;
  margin-bottom: auto;
  align-self: flex-start;
}

// Make the left menu follow the scroll
.code-container {
  transition: all 0.5s ease;
  display: block;

  .textbox-container {
    width: 40%;
    margin-top: 0;
    position: sticky;
    display: inline-block;
    top: 16px;
    vertical-align: top;
    max-width: calc(100% - 1080px);

    .box-card {
        max-width: 340px;
        margin: 0 auto;
    }
  }

  .canvas-code {
    display: inline-block;
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

#copy-text-area {
  width: 80%;
  height: 200px;
}

.GFbanner {
  height: 190px;
}



.box-card {
  width: 480px;
}

.card {
  margin: 10px;
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
