<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"
import { ArrowDownTrayIcon } from "@heroicons/vue/20/solid"
import ActionButton from "../components/ActionButton.vue"

const pdfUrl = computed(() => {
  return new URL('../assets/files/CourseBuilderQuickstart.pdf', import.meta.url).href
})
</script>

<template>
  <main>
    <!-- Hero Container -->
    <div
      id="fullHeightHero"
      class="bg-no-repeat bg-center bg-cover w-full max-w-[1600px]"
    >
      <!-- Hero overlay -->
      <div
        class="w-full h-full bg-black/40 px-2 py-4 flex flex-col justify-center items-center text-center text-white"
      >
        <h1 class="mb-4 text-2xl md:text-5xl">Guide</h1>
        <div class="bg-white h-[1px] w-full md:w-3/4 mx-auto opacity-50"></div>
        <p class="mt-4 mb-4 text-white/80">
          This website is designed to allow Professors and TA's to quickly build
          beautiful and functional class websites on Columbia's new
          Canvas/Courseworks platform.
        </p>
        <p class="mb-4 text-white/80">
          For help using this website, download the guides below and click the
          "Help" button on the top right of your screen for page specific tips.
        </p>
        <p class="mb-4 text-white/80">
          To start building your course
          <span class="cursor-pointer font-semibold hover:underline text-white"
            >click here</span
          >
          or press <span class="font-semibold text-white">Get Started</span>.
        </p>
        <div class="bg-white h-[1px] w-full md:w-3/4 mx-auto opacity-50"></div>
        <div class="mt-4 flex space-x-2">
          <a :href="pdfUrl" download>
            <ActionButton
              text="Quick Start Guide"
              custom-bg="bg-green-600"
              custom-bg-on-hover="bg-green-500"
              text-color="text-white"
            >
              <template #prepend>
                <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
              </template>
            </ActionButton>
          </a>
          <ActionButton text="Get Started"></ActionButton>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#fullHeightHero {
  height: calc(100vh - 179.26px);
  background-image: url("../assets/images/cover01.jpg");
}

@media screen and (max-width: 425px) {
  #fullHeightHero {
    height: 100%;
    background-image: url("../assets/images/cover01.jpg");
  }
}
</style>
