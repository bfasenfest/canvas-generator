<script setup>
import { ref } from "vue"

const props = defineProps({
  text: { type: String, required: true },
  customBg: String,
  textColor: String,
  customBgOnHover: String,
  xl: Boolean,
})
const button = ref(null)

function changeCustomColorOnMouseEnter() {
  if(!props.customBg) return
  button.value.classList.replace(props.customBg, props.customBgOnHover)
}
function changeCustomColorOnMouseLeave() {
  if(!props.customBg) return
  button.value.classList.replace(props.customBgOnHover, props.customBg)
}
</script>

<template>
  <button
    ref="button"
    class="cursor-pointer rounded-lg flex items-center select-none transition-colors w-fit h-fit"
    :class="`
      ${customBg
        ? `${customBg} ${textColor}`
        : 'bg-blue-600 text-white hover:bg-blue-500'}
       ${ xl ? 'py-4 px-8 text-2xl' : 'py-2 px-4' }
    `"
    @mouseenter="changeCustomColorOnMouseEnter"
    @mouseleave="changeCustomColorOnMouseLeave"
  >
    <slot name="prepend"></slot>
    {{ text }}
    <slot name="append"></slot>
  </button>
</template>

<style></style>
