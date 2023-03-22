<script setup>
import { ref } from "vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"
import { useCourseHeadersStore } from "../../stores/courseHeaders"
import useEmitter from "../../composables/useEmitter"

const courseStore = useCourseHeadersStore()
const emitter = useEmitter()

const showInputSemester = ref(false)
const showInputTitle = ref(false)
const inputValueSemester = ref(courseStore.semester)
const inputValueTitle = ref(courseStore.title)

function handleOpenSemester() {
  inputValueSemester.value = courseStore.semester
  showInputSemester.value = true
}

function handleOpenTitle() {
  inputValueTitle.value = courseStore.title
  showInputTitle.value = true
}

function handleCloseSemester() {
  inputValueSemester.value = courseStore.semester
  showInputSemester.value = false
}

function handleCloseTitle() {
  inputValueTitle.value = courseStore.title
  showInputTitle.value = false
}

function updateSemester() {
  courseStore.setSemester(inputValueSemester.value)
  showInputSemester.value = false
  emitter.emit("refresh-semester")
}

function updateTitle() {
  courseStore.setTitle(inputValueTitle.value)
  showInputTitle.value = false
  emitter.emit("refresh-title")
}
</script>

<template>
  <div :class="courseStore.organization.banner" style="padding: 40px">
    <img
      v-if="courseStore.organization.logo"
      :src="courseStore.organization.logo"
      style="margin-top: -10px; margin-left: 10px; height: 40px"
      alt="Organization Right Logo"
    />
    <img
      v-if="courseStore.organization.rightLogo"
      :src="courseStore.organization.rightLogo"
      style="float: right; height: 100px; margin-top: 10px"
      alt="Organization Right Logo"
    />

    <div
      v-if="showInputTitle"
      class="mt-4 flex space-x-2"
      @keyup.esc="handleCloseTitle"
    >
      <button
        class="rounded-full bg-red-400 text-white h-8 w-8 p-1 my-auto"
        @click.prevent="handleCloseTitle"
      >
        <XMarkIcon />
      </button>
      <input
        autofocus
        type="text"
        v-model="inputValueTitle"
        class="rounded-lg px-2 bg-gray-100"
      />
      <button
        class="rounded-lg bg-blue-500 text-white px-4 py-2"
        @click.prevent="updateTitle"
      >
        Save
      </button>
    </div>
    <p
      v-else
      style="
        color: white;
        font-weight: 500;
        margin-top: 12px;
        margin-left: 40px;
        font-size: 18px;
      "
      @dblclick="handleOpenTitle"
    >
      {{ courseStore.title.toUpperCase() }}
    </p>

    <div
      v-if="showInputSemester"
      class="mt-4 flex space-x-2"
      @keyup.esc="handleCloseSemester"
    >
      <button
        class="rounded-full bg-red-400 text-white h-8 w-8 p-1 my-auto"
        @click.prevent="handleCloseSemester"
      >
        <XMarkIcon />
      </button>
      <input
        autofocus
        type="text"
        v-model="inputValueSemester"
        class="rounded-lg px-2 bg-gray-100"
      />
      <button
        class="rounded-lg bg-blue-500 text-white px-4 py-2"
        @click.prevent="updateSemester"
      >
        Save
      </button>
    </div>
    <p
      v-else
      style="
        color: white;
        font-weight: 500;
        margin-top: 2px;
        margin-left: 40px;
        font-size: 18px;
      "
      @dblclick="handleOpenSemester"
    >
      {{ courseStore.semester }}
    </p>
  </div>
</template>
