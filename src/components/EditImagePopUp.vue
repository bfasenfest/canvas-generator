<script setup>
import { ref, watch, onMounted, computed } from "vue"
import ActionButton from "./ActionButton.vue"
import CustomInputText from "./CustomInputText.vue"
import PopUp from "./PopUp.vue"

const props = defineProps(["show", "data"])
const emit = defineEmits(["update:show", "save"])

const localShow = ref(false)
const containerTag = ref(null)
const editableImgData = ref(null)
const typeOfURL = ref("local")

const originalImgData = computed(() => {
  if (!containerTag.value) return containerTag.value
  return containerTag.value.firstChild
})

onMounted(() => {
  localShow.value = props.show || false
})

function save() {
  emit("save", editableImgData.value)
}

function setEditableImgSrc(ev) {
  editableImgData.value.src = URL.createObjectURL(
    document.getElementById("sourceInputLocal").files[0]
  )
  console.log(document.getElementById("imagePreviewer").width)
  editableImgData.value.width = document.getElementById("imagePreviewer").width
  console.log(document.getElementById("imagePreviewer").height)
  editableImgData.value.height = document.getElementById("imagePreviewer").height
}

watch(localShow, (val) => emit("update:show", val))
watch(originalImgData, (val) => {
  editableImgData.value = {
    src: val.src,
    alt: val.alt,
    width: val.width,
    height: val.height,
  }
})
</script>

<template>
  <PopUp v-model:show="localShow" persistent @confirm="save">
    <template #content>
      <!-- Previous image from where we take all it's values -->
      <div style="display: none" ref="containerTag" v-html="props.data"></div>

      <!-- Form to Edit Image -->
      <div v-if="editableImgData" class="flex space-x-4">
        <img
          id="imagePreviewer"
          :src="editableImgData.src || originalImgData.src"
          :alt="editableImgData.alt"
          :width="editableImgData.width"
        />

        <div class="w-[400px]">
          <div class="flex justify-center my-4 space-x-2">
            <ActionButton
              :custom-bg="typeOfURL === 'local' ? '' : 'bg-gray-100'"
              text="From Computer"
              @click.prevent="typeOfURL = 'local'"
            />
            <ActionButton
              :custom-bg="typeOfURL === 'remote' ? '' : 'bg-gray-100'"
              text="From URL"
              @click.prevent="typeOfURL = 'remote'"
            />
          </div>

          <input
            v-if="typeOfURL === 'local'"
            accept="image/*"
            id="sourceInputLocal"
            type="file"
            alt="Input to upload an image from your computer"
            @change="setEditableImgSrc"
          />
          <CustomInputText
            v-else
            id="sourceInputRemote"
            label="Image Source"
            v-model:value="editableImgData.src"
          />

          <CustomInputText
            id="widthInput"
            label="Width"
            v-model:value="editableImgData.width"
          />

          <CustomInputText
            id="HeightInput"
            label="Height"
            v-model:value="editableImgData.height"
          />

          <CustomInputText
            id="AltInput"
            label="Alt"
            v-model:value="editableImgData.alt"
          />
        </div>
      </div>
    </template>
  </PopUp>
</template>

<style scoped>
#sourceInputLocal {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 16px;
  line-height: 1.5;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
