<script setup>
import { ref, onMounted } from "vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"
import ActionButton from "./ActionButton.vue"

const props = defineProps({
  show: { type: Boolean, default: false },
  headerTitle: { type: String, default: "" },
  persistent: { type: Boolean, default: false },
  customHeader: { type: Boolean, default: false },
  customActions: { type: Boolean, default: false },
  confirmActionButtonText: { type: String, default: "Submit" },
})
const emit = defineEmits(["update:show", "confirm"])

const popUpOverlay = ref(null)
const animationHolder = ref(null)

onMounted(() => {
  setTimeout(() => {
    document.getElementById("app").style.overflow = "hidden"
    document.getElementById("app").style.height = "100vh"
    popUpOverlay.value.classList.add("custom-show")
    animationHolder.value.classList.add("custom-show")
  }, 100)
})

function close() {
  popUpOverlay.value.classList.remove("custom-show")
  animationHolder.value.classList.remove("custom-show")
  document.getElementById("app").style.overflow = ""
  document.getElementById("app").style.height = ""
  setTimeout(() => {
    emit("update:show", false)
  }, 200)
}

function selfClose() {
  if (props.persistent) return
  close()
}
</script>

<template>
  <!-- Overlay -->
  <div
    ref="popUpOverlay"
    v-if="show"
    class="custom-pop-up-overlay absolute top-0 left-0 w-full h-full bg-black/40 z-10"
  >
    <!-- Animation Holder -->
    <div
      ref="animationHolder"
      class="custom-pop-up-holder absolute left-0 w-full h-full"
    >
      <!-- Container -->
      <div
        class="w-full h-full flex items-center justify-center"
        @click.self="selfClose"
      >
        <article
          class="rounded-lg bg-white min-w-[300px] md:min-w-[420px] p-4 text-black/75"
        >
          <div v-if="!customHeader" class="flex justify-between items-center">
            <h3 class="text-xl">{{ headerTitle }}</h3>
            <XMarkIcon class="h-5 w-5 cursor-pointer" @click.prevent="close" />
          </div>

          <slot name="header"></slot>

          <div
            class="bg-black h-[1px] w-full mt-2 mb-4 mx-auto opacity-50"
          ></div>

          <slot name="content"></slot>

          <div
            class="bg-black h-[1px] w-full mt-4 mb-2 mx-auto opacity-50"
          ></div>

          <slot name="actions">
            <div class="flex justify-end space-x-2">
              <ActionButton
                text="Cancel"
                custom-bg="transparent"
                custom-bg-on-hover="bg-gray-100"
                @click.prevent="close"
              ></ActionButton>
              <ActionButton
                :text="confirmActionButtonText"
                @click.prevent="emit('confirm')"
              ></ActionButton>
            </div>
          </slot>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-pop-up-overlay {
  opacity: 0;
  transition: opacity 0.2s;
}

.custom-pop-up-overlay.custom-show {
  opacity: 1;
}

.custom-pop-up-holder {
  top: -10px;
  opacity: 0;
  transition: top 0.2s, opacity 0.2s;
}
.custom-pop-up-holder.custom-show {
  top: 0;
  opacity: 1;
}
</style>
