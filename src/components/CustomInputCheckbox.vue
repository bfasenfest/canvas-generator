<script setup>
import { ref, watch, onMounted, useAttrs } from "vue"

const props = defineProps(["label", "id"])
const emit = defineEmits(["update:value"])
const attrs = useAttrs()

const value = ref(false)

onMounted(() => {
  setTimeout(() => {
    value.value = attrs.value
  }, 150)
})

watch(value, () => emit('update:value', value.value))
</script>

<template>
  <div class="flex items-center">
    <label class="select-none font-semibold mr-2" @click="value = !value">
      {{ label }}
    </label>
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        :id="id"
        :name="id"
        type="checkbox"
        class="sr-only peer"
        v-model="value"
      />
      <div
        class="w-11 h-6 peer-focus:outline-none rounded-full peer bg-red-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"
      ></div>
    </label>
  </div>
</template>
