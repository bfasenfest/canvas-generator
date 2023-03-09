import { createApp, watch } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

import "./assets/main.css"

const app = createApp(App)
const pinia = createPinia()

if (localStorage.getItem("courseHeaders")) {
  pinia.state.value.courseHeaders = JSON.parse(localStorage.getItem("courseHeaders"))
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

app.mount("#app")
