<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import ActionButton from '../components/ActionButton.vue';
import CourseSettings from '../components/CourseSettings.vue';

const showCourseSettings = ref(false)
</script>

<template>
  <main>
    <!-- Hero Container -->
    <div
      id="home-hero-container"
      class="bg-no-repeat bg-cover bg-center w-full h-[650px] flex flex-col items-center justify-center"
    >
      <img
        class="w-[250px] md:w-[400px]"
        src="https://s3.amazonaws.com/cu-coursebuilder/images/CCB_logo.jpg"
        alt="Columbia Canvas Course Builder Logo"
      >
      <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 justify-between w-[250px] md:w-[400px] mt-4">
        <RouterLink to="guide">
          <ActionButton text="View Guide" :xl="true"></ActionButton>
        </RouterLink>
        <ActionButton text="Get Started" :xl="true" @click.prevent="showCourseSettings = true"></ActionButton>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 bg-blue-600 text-white h-[250px]">
      <article class="text-center p-6">
        <h3 class="text-5xl font-semibold">1</h3>
        <p class="mt-10 font-semibold">DESIGN IN REAL TIME</p>
        <p class="mt-5 text-sm text-white/80">
          This website allows Columbia Professors and TA's to quickly build Canvas class websites using our pre-built course template.
        </p>
      </article>
      <article class="text-center p-6">
        <h3 class="text-5xl font-semibold">2</h3>
        <p class="mt-10 font-semibold">EXPORT CODE</p>
        <p class="mt-5 text-sm text-white/80">
          Once each page is built, you can copy the code for the page template.
        </p>
      </article>
      <article class="text-center p-6">
        <h3 class="text-5xl font-semibold">3</h3>
        <p class="mt-10 font-semibold">INSERT INTO CANVAS</p>
        <p class="mt-5 text-sm text-white/80">
          And insert it into the canvas Page! See
            <RouterLink to="guide" class="font-semibold hover:underline text-white">user guide</RouterLink>
          for details.
        </p>
      </article>
    </div>

    <CourseSettings v-if="showCourseSettings" v-model:show="showCourseSettings"/>
  </main>
</template>

<style scoped>
#home-hero-container {
  background-image: url('../assets/images/cover01.jpg');
}
</style>
