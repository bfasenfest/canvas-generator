<script setup>
import { ref } from "vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"
import { useCourseHeadersStore } from "../../stores/courseHeaders"
import useEmitter from "../../composables/useEmitter"

const courseStore = useCourseHeadersStore()
const emitter = useEmitter()

const showInput = ref(false)
const inputValue = ref(courseStore.semester)

function handleOpen() {
  inputValue.value = courseStore.semester
  showInput.value = true
}

function handleClose() {
  inputValue.value = courseStore.semester
  showInput.value = false
}

function updateSemester() {
  courseStore.setSemester(inputValue.value)
  showInput.value = false
  emitter.emit("refresh-semester")
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
    <div v-if="showInput" class="mt-4 flex space-x-2" @keyup.esc="handleClose">
      <button
        class="rounded-full bg-red-400 text-white h-8 w-8 p-1 my-auto"
        @click.prevent="handleClose"
      >
        <XMarkIcon />
      </button>
      <input
        autofocus
        type="text"
        v-model="inputValue"
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
        margin-top: 12px;
        margin-left: 40px;
        font-size: ;
      "
      @dblclick="handleOpen"
    >
      {{ courseStore.semester }}
    </p>
  </div>
</template>
