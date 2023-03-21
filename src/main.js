import { createApp, watch } from "vue"
import { createPinia } from "pinia"
import { QuillEditor } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"

import App from "./App.vue"
import router from "./router"

import "./assets/main.css"
import mitt from "mitt"

const app = createApp(App)
const pinia = createPinia()
const emitter = mitt()

if (localStorage.getItem("courseHeaders")) {
  pinia.state.value.courseHeaders = JSON.parse(
    localStorage.getItem("courseHeaders")
  )
}

watch(
  () => pinia.state.value.courseHeaders,
  (state) => {
    localStorage.setItem("courseHeaders", JSON.stringify(state))
  },
  { deep: true }
)

app.use(pinia)
app.use(router)
app.config.globalProperties.emitter = emitter

const quillOptions = {
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      ["blockquote", { list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }, "clean"],
      ["link"],
    ],
  },
}
QuillEditor.props.globalOptions.default = () => quillOptions
app.component("QuillEditor", QuillEditor)

app.mount("#app")
