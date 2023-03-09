<script setup>
import { ref, computed, onMounted } from "vue"

import { useCourseHeadersStore } from "../stores/courseHeaders"

import PopUp from "./PopUp.vue"
import CustomInputText from "./CustomInputText.vue"
import CustomInputCheckbox from "./CustomInputCheckbox.vue"
import CustomOrganizationSelect from "./CustomOrganizationSelect.vue"

const props = defineProps({ show: { type: Boolean, default: false } })
const emit = defineEmits(["update:show"])
const courseHeadersStore = useCourseHeadersStore()

// Validation
const urlRegex =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi

// UI
const showFeedback = ref(false)

// Data
const title = ref("")
const courseUrl = ref("")
const organization = ref({
  option: "Columbia",
  banner: "CU01",
  slim: "CU01_Slim",
  wide: "STV1_BannerBlue",
  logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/Columbia_Logo_hq.png",
  primary: "#008EE2",
})
const studentsPage = ref(false)

// Computed
const validURL = computed(() => !!courseUrl.value.match(urlRegex))

// Lifecycle
onMounted(() => {
  title.value = courseHeadersStore.title
  courseUrl.value = courseHeadersStore.courseUrl
  organization.value = courseHeadersStore.organization
  studentsPage.value = courseHeadersStore.useStudentsPage
})

// Methods
function save() {
  courseHeadersStore.setTitle(title.value)
  courseHeadersStore.setCourseUrl(courseUrl.value)
  courseHeadersStore.setOrganization(organization.value)
  courseHeadersStore.setUseStudentsPage(studentsPage.value)
  emit('update:show', false)
}

function validate() {
  if (validURL.value) save()
  else showFeedback.value = true
}
</script>

<template>
  <PopUp
    persistent
    v-if="show"
    :show="show"
    header-title="Course Info"
    @confirm="validate"
    @update:show="emit('update:show', false)"
  >
    <template #content>
      <CustomInputText
        id="titleInput"
        label="Course Title"
        v-model:value="title"
      />

      <CustomInputText
        :valid="validURL"
        label="Course URL"
        id="courseUrlInput"
        v-model:value="courseUrl"
        :show-feedback="showFeedback"
        invalid-message="Invalid URL."
      />

      <CustomOrganizationSelect
        id="organizationSelect"
        label="Organization"
        v-model:value="organization"
      />
      <CustomInputCheckbox
        id="studentPagesCheckbox"
        label="Use Student Pages"
        v-model:value="studentsPage"
      />
    </template>
  </PopUp>
</template>

<style scoped></style>
