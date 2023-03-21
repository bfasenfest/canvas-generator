<script setup>
import { ref, computed, onMounted, useAttrs, watch } from "vue"

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
  valid: {
    type: Boolean,
    required: false,
    default: false,
  },
  value: {
    required: false,
    default: "",
  },
  invalidMessage: {
    type: String,
    required: false,
    default: "",
  },
  showFeedback: {
    type: Boolean,
    required: false,
    default: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  tooltipHintText: {
    type: String,
    required: false,
    default: "",
  },
})
const emit = defineEmits(["update:value"])
const attrs = useAttrs()

const localValue = ref("")
const focus = ref(false)

const showError = computed(
  () =>
    !props.valid && props.invalidMessage && localValue.value && props.showFeedback
)

onMounted(() => {
  localValue.value = props.value
})

function setFocus(value) {
  focus.value = value
}

function updateValue() {
  emit("update:value", localValue.value)
}

watch(
  () => props.value,
  (val) => {
    if (val !== localValue.value) localValue.value = val
  }
)
</script>

<template>
  <div
    class="form-group transition-all duration-200"
    :class="focus || localValue || placeholder ? 'mt-8' : 'mt-2'"
  >
    <label
      class="form-label font-medium tracking-wide select-none"
      :class="{ 'label-animated': focus || localValue || placeholder }"
      for="input-field"
    >
      {{ label }}
    </label>
    <input
      class="form-input rounded-md"
      type="text"
      :id="id"
      :title="tooltipHintText"
      :placeholder="placeholder"
      v-model="localValue"
      @input="updateValue"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
    />
    <div v-if="showError" class="text-red-500 font-semibold ml-2 mt-1 text-sm">
      {{ invalidMessage }}
    </div>
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
