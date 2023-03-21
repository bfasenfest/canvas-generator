<script setup>
import { ref } from "vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"
import { useCourseHeadersStore } from "../../stores/courseHeaders"
import useEmitter from "../../composables/useEmitter"

const courseStore = useCourseHeadersStore()
const emitter = useEmitter()

const showNameInput = ref(false)
const showEmailInput = ref(false)
const showCourseDateInput = ref(false)

const instructorName = ref(courseStore.instructorName)
const instructorEmail = ref(courseStore.instructorEmail)
const courseDate = ref(courseStore.courseDate)

function switchNameInputVisibility() {
  instructorName.value = courseStore.instructorName
  showNameInput.value = !showNameInput.value
}

function switchEmailInputVisibility() {
  instructorEmail.value = courseStore.instructorEmail
  showEmailInput.value = !showEmailInput.value
}

function switchCourseDateInputVisibility() {
  courseDate.value = courseStore.courseDate
  showCourseDateInput.value = !showCourseDateInput.value
}

function updateInstructorName() {
  courseStore.setInstructorName(instructorName.value)
  showNameInput.value = false
  emitter.emit("refresh-instructor-name")
}

function updateInstructorEmail() {
  courseStore.setInstructorEmail(instructorEmail.value)
  showEmailInput.value = false
  emitter.emit("refresh-instructor-email")
}

function updateCourseDate() {
  courseStore.setCourseDate(courseDate.value)
  showCourseDateInput.value = false
  emitter.emit("refresh-course-date")
}
</script>

<template>
  <div
    style="
      border-top-width: 2px;
      border-bottom-width: 2px;
      border-left-width: 2px;
      padding: 0.75rem;
      background-color: white;
    "
  >
    <p style="padding-bottom: 1.25rem">Instructor:</p>

    <div style="display: flex; align-items: center">
      <div
        v-if="showNameInput"
        class="flex space-x-2 mr-2"
        @keyup.esc="switchNameInputVisibility"
      >
        <button
          class="rounded-full bg-red-400 text-white h-8 w-8 p-1 my-auto"
          @click.prevent="switchNameInputVisibility"
        >
          <XMarkIcon />
        </button>
        <input
          autofocus
          type="text"
          v-model="instructorName"
          class="rounded-lg bg-gray-100 px-2"
        />
        <button
          class="rounded-lg bg-blue-500 text-white px-4 py-2"
          @click.prevent="updateInstructorName"
        >
          Save
        </button>
      </div>
      <p v-else @dblclick="switchNameInputVisibility" style="margin-right: 4px">
        {{ courseStore.instructorName || "Pending Professor Name" }}
      </p>

      <div
        v-if="showEmailInput"
        class="flex space-x-2"
        @keyup.esc="switchEmailInputVisibility"
      >
        <button
          class="rounded-full bg-red-400 text-white h-8 w-8 p-1 my-auto"
          @click.prevent="switchEmailInputVisibility"
        >
          <XMarkIcon />
        </button>
        <input
          autofocus
          type="text"
          v-model="instructorEmail"
          class="rounded-lg bg-gray-100 px-2"
        />
        <button
          class="rounded-lg bg-blue-500 text-white px-4 py-2"
          @click.prevent="updateInstructorEmail"
        >
          Save
        </button>
      </div>
      <p v-else @dblclick="switchEmailInputVisibility">
        ({{ courseStore.instructorEmail }})
      </p>
    </div>

    <div
      v-if="showCourseDateInput"
      class="flex space-x-2 mt-2"
      @keyup.esc="switchCourseDateInputVisibility"
    >
      <button
        class="rounded-full bg-red-400 text-white h-8 w-8 p-1 my-auto"
        @click.prevent="switchCourseDateInputVisibility"
      >
        <XMarkIcon />
      </button>
      <input
        autofocus
        type="text"
        v-model="courseDate"
        class="rounded-lg bg-gray-100 px-2"
      />
      <button
        class="rounded-lg bg-blue-500 text-white px-4 py-2"
        @click.prevent="updateCourseDate"
      >
        Save
      </button>
    </div>
    <p
      v-else
      @dblclick="switchCourseDateInputVisibility"
      style="margin-bottom: 1.25rem"
    >
      {{ courseStore.courseDate }}
    </p>
  </div>
</template>

<style></style>
