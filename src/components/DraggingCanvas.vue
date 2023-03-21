<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue"
import draggable from "vuedraggable"

import { TrashIcon } from "@heroicons/vue/24/solid"

import ActionButton from "../components/ActionButton.vue"
import EditImagePopUp from "./EditImagePopUp.vue"

const props = defineProps({
  content: { type: Array, required: true },
  hideActions: Boolean,
  noShortcuts: Boolean,
})
const emit = defineEmits(["update:content"])

const canvasContainer = ref(null)
const localContent = ref([])
const selectedContentToEdit = ref("")
// This array will contain the indexes of the elements with quill editor open
const openedDirections = ref([])

const dragHelp = ref(false)
const showQuitters = ref(false)
const showEditImage = ref(false)
const previousShowQuitters = ref(false)

const rowHeights = computed(() => {
  const rowElements =
    canvasContainer.value.getElementsByClassName("canvas__row")
  const res = []
  for (let i = 0; i < rowElements.length; i++) {
    const el = rowElements[i]
    res.push(el.offsetHeight)
  }
  return res
})

onMounted(() => {
  if (!props.noShortcuts) document.addEventListener("keyup", handleShortcut)
  localContent.value = props.content
})

onUnmounted(() => {
  document.removeEventListener("keyup", handleShortcut, false)
})

function deleteRow(index) {
  localContent.value.splice(index, 1)
}

function deleteCol(rowIndex, colIndex) {
  localContent.value[rowIndex].splice(colIndex, 1)
}

function deleteSlot(rowIndex, colIndex, slotIndex) {
  localContent.value[rowIndex][colIndex].splice(slotIndex, 1)
}

function handleShortcut(ev) {
  if (ev.altKey && ev.code === "KeyA") dragHelp.value = !dragHelp.value
  if (ev.altKey && ev.code === "KeyS") showQuitters.value = !showQuitters.value
}

function handleDragStart() {
  if (showQuitters.value) switchShowQuitters()
}

function handleDragEnd() {
  if (previousShowQuitters.value) switchShowQuitters()
}

function clearEdit(rowIndex, colIndex, slotIndex) {
  localContent.value[rowIndex][colIndex][slotIndex].edit = false
  openedDirections.value = openedDirections.value.filter(
    (dir) => dir !== `${rowIndex}${colIndex}${slotIndex}`
  )
  selectedContentToEdit.value = ""
}

function saveEdit(rowIndex, colIndex, slotIndex) {
  localContent.value[rowIndex][colIndex][slotIndex].html =
    selectedContentToEdit.value
  clearEdit(rowIndex, colIndex, slotIndex)
}

function setEdit(rowIndex, colIndex, slotIndex) {
  localContent.value[rowIndex][colIndex][slotIndex].edit = true
  const slot = JSON.parse(
    JSON.stringify(localContent.value[rowIndex][colIndex][slotIndex])
  )

  if (slot.type === "img") showEditImage.value = true

  openedDirections.value.push(`${rowIndex}${colIndex}${slotIndex}`)
  selectedContentToEdit.value = slot.html
}

function setImage(data) {
  console.log(data)

  const slotId = openedDirections.value[openedDirections.value.length - 1]

  localContent.value[slotId.charAt(0)][slotId.charAt(1)][slotId.charAt(2)].html =
    `<img src="${data.src}" alt="${data.alt}" width="${data.width}" height="${data.height}" />`
}

function switchShowQuitters() {
  previousShowQuitters.value = showQuitters.value
  showQuitters.value = !showQuitters.value
}

watch(localContent, () => {
  emit("update:content", localContent.value)
})
</script>

<template>
  <div>
    <!-- TEMPLATE ACTIONS -->
    <div v-if="!hideActions" class="flex justify-center mb-4 space-x-2">
      <ActionButton
        :text="`${dragHelp ? 'Hide' : 'Show'} Drag Helpers`"
        @click.prevent="dragHelp = !dragHelp"
      />
      <ActionButton
        :text="`${showQuitters ? 'Hide' : 'Show'} Quitters`"
        @click.prevent="showQuitters = !showQuitters"
      />
    </div>
    <!-- END OF TEMPLATE ACTIONS -->

    <!-- TEMPLATE CONTAINER -->
    <div
      ref="canvasContainer"
      id="canvasContainer"
      style="
        max-width: 1015px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
      "
    >
      <draggable
        id="homeContentDraggable"
        v-model="localContent"
        :item-key="`item-home-rows-content`"
      >
        <template #item="{ element, index }">
          <div>
            <button
              class="absolute rounded-full bg-blue-500 cursor-pointer left-5 h-10 w-10 p-2 text-white z-10"
              :style="`top: ${index ? rowHeights[index - 1] + 20 : 20}px`"
              title="Delete Row"
              v-if="showQuitters"
              @click.prevent="deleteRow(index)"
            >
              <TrashIcon />
            </button>
            <draggable
              group="rows"
              v-model="localContent[index]"
              :item-key="`item-home-row#${index + 1}`"
              class="canvas__row relative"
              style="display: grid; gap: 0.25rem"
              :style="`grid-template-columns: repeat(${element.length}, minmax(0, 1fr))`"
              :class="{ 'bg-blue-300 border-2 border-dotted': dragHelp }"
            >
              <template #item="col">
                <div>
                  <button
                    class="absolute rounded-full bg-orange-500 cursor-pointer top-5 right-5 h-10 w-10 p-2 text-white z-10"
                    title="Delete Column"
                    v-if="showQuitters"
                    @click.prevent="deleteCol(index, col.index)"
                  >
                    <TrashIcon />
                  </button>
                  <draggable
                    group="cols"
                    v-model="localContent[index][col.index]"
                    :item-key="`item-home-col#${col.index}-of-row#${index + 1}`"
                    style="padding: 16px; position: relative"
                    :class="{ 'bg-orange-300 border-2 border-black': dragHelp }"
                    @start="handleDragStart"
                    @end="handleDragEnd"
                  >
                    <template #item="slot">
                      <div>
                        <button
                          class="absolute rounded-full bg-red-500 cursor-pointer top-12 right-1 h-10 w-10 p-2 text-white z-10"
                          title="Delete Slot"
                          v-if="showQuitters"
                          @click.prevent="
                            deleteSlot(index, col.index, slot.index)
                          "
                        >
                          <TrashIcon />
                        </button>

                        <component
                          v-if="slot.element.dynamic"
                          :is="slot.element.name"
                        ></component>

                        <div
                          v-else-if="
                            slot.element.edit && slot.element.type !== 'img'
                          "
                        >
                          <QuillEditor
                            theme="snow"
                            content-type="html"
                            :id="`quill-${index}${col.index}${slot.index}`"
                            v-model:content="selectedContentToEdit"
                          />
                          <div class="flex space-x-2 justify-center mt-2">
                            <ActionButton
                              text="Cancel"
                              @click.prevent="
                                clearEdit(index, col.index, slot.index)
                              "
                              custom-bg="bg-gray-100"
                            />
                            <ActionButton
                              text="Save"
                              @click.prevent="
                                saveEdit(index, col.index, slot.index)
                              "
                            />
                          </div>
                        </div>
                        <div
                          v-else
                          :id="slot.element.id"
                          v-html="slot.element.html"
                          style="background-color: white"
                          @dblclick="setEdit(index, col.index, slot.index)"
                        ></div>
                      </div>
                    </template>
                  </draggable>
                </div>
              </template>
            </draggable>
          </div>
        </template>
      </draggable>
    </div>
    <!-- END OF TEMPLATE CONTAINER -->

    <!-- START OF EDIT IMAGE -->
    <EditImagePopUp
      v-if="showEditImage"
      v-model:show="showEditImage"
      header-title="Edit Image"
      :data="selectedContentToEdit"
      @save="setImage"
    />
    <!-- END OF EDIT IMAGE -->
  </div>
</template>

<style></style>
