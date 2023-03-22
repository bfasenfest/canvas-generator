<script setup>
import { ref } from "vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"

import { useCourseHeadersStore } from "../../stores/courseHeaders"
import useEmitter from "../../composables/useEmitter"

const courseHeadersStore = useCourseHeadersStore()
const emitter = useEmitter()

const showInput = ref(false)
const inputValue = ref(courseHeadersStore.title)

function handleSwitch() {
  inputValue.value = courseHeadersStore.title
  showInput.value = !showInput.value
}

function updateTitle() {
  courseHeadersStore.setTitle(inputValue.value)
  emitter.emit('refresh-title')
  showInput.value = false
}
</script>

<template>
  <div
    v-if="showInput"
    class="flex items-center space-x-2"
    style="padding: 12px 12px 24px 12px; background-color: #f5f5f5"
  >
    <button
      class="rounded-full bg-red-400 text-white h-8 w-8 p-1 my-auto"
      @click.prevent="handleSwitch"
    >
      <XMarkIcon />
    </button>
    <input
      autofocus
      type="text"
      v-model="inputValue"
      class="rounded-lg px-2 py-1 bg-gray-100"
    />
    <button
      class="rounded-lg bg-blue-500 text-white px-4 py-2"
      @click.prevent="updateTitle"
    >
      Save
    </button>
  </div>
  <h4
    v-else
    style="
      font-weight: bold;
      font-size: 1.125rem;
      line-height: 1.75rem;
      padding: 12px 12px 24px 12px;
      background-color: #f5f5f5;
    "
    @dblclick="handleSwitch"
  >
    Welcome To {{ courseHeadersStore.title }}
  </h4>
</template>

<style></style>
