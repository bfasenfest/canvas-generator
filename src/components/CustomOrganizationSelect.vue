<script setup>
import { ref, useAttrs, onMounted } from "vue"
import { useCourseHeadersStore } from "../stores/courseHeaders"

const courseHeadersStore = useCourseHeadersStore()

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: "input-field",
  },
  label: {
    type: String,
    required: true,
  },
})
const attrs = useAttrs()
const emit = defineEmits(["update:value"])

const value = ref({
  option: "Columbia",
  banner: "CU01",
  slim: "CU01_Slim",
  wide: "STV1_BannerBlue",
  logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/Columbia_Logo_hq.png",
  primary: "#008EE2",
})
const focus = ref(false)

onMounted(() => {
  setTimeout(() => {
    if (attrs.value) value.value = attrs.value
    else if (courseHeadersStore.organization)
      value.value = courseHeadersStore.organization
  }, 150)
})

function setFocus(value) {
  focus.value = value
}

function updateValue() {
  emit("update:value", value.value)
}
</script>

<template>
  <div class="form-group transition-all duration-200 mt-8">
    <label
      class="form-label font-medium tracking-wide select-none"
      :class="{ 'label-animated': focus || value }"
      for="input-field"
    >
      {{ label }}
    </label>
    <select
      class="form-input rounded-md"
      :name="id"
      :id="id"
      v-model="value"
      @change="updateValue"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
    >
      <option
        v-for="theme in courseHeadersStore.availableThemes"
        :value="theme"
        :id="`${id}-option-${theme.option}`"
      >
        {{ theme.option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}
.form-input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 16px;
  line-height: 1.5;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-input:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(49, 130, 206, 0.25);
  border-color: #3182ce;
}
.form-label {
  position: absolute;
  top: 0.375rem;
  left: 0.75rem;
  line-height: 1.5;
  color: #a1a1aa;
  pointer-events: none;
  transition: top 0.2s, font-size 0.2s;
}
.label-animated {
  top: -1.5rem;
  font-size: 12px;
  color: black;
}
</style>
