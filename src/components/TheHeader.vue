<script setup>
import { ref } from "vue"
import { RouterLink } from "vue-router"
import {
  Bars4Icon,
  Cog6ToothIcon,
  InformationCircleIcon,
} from "@heroicons/vue/20/solid"
import PopUp from "./PopUp.vue"

import { useCourseHeadersStore } from "../stores/courseHeaders"

import CourseSettings from "./CourseSettings.vue"
import ActionButton from "./ActionButton.vue"

const courseHeadersStore = useCourseHeadersStore()

const showCourseSettings = ref(false)
const showHelper = ref(false)
</script>

<template>
  <header
    class="flex justify-between items-center px-4 md:px-8 py-6 max-w-[1600px] mx-auto bg-gray-100"
  >
    <div class="md:hidden flex items-center cursor-pointer">
      <Bars4Icon class="h-5 w-5 mr-1" />
    </div>

    <div class="hidden md:flex items-center text-center">
      <RouterLink
        to="/"
        class="rounded-full bg-black mr-3"
        style="padding: 10px 13px 10px 13px"
      >
        <img
          src="../assets/images/sipalogo_trans.png"
          height="20"
          width="24"
          alt="SIPA Logo"
        />
      </RouterLink>

      <RouterLink class="hover:text-blue-400" to="/course-home"
        >Home</RouterLink
      >
      <span class="mx-1">/</span>
      <RouterLink class="hover:text-blue-400" to="#">Syllabus</RouterLink>
      <span class="mx-1">/</span>
      <RouterLink class="hover:text-blue-400" to="#">Activity List</RouterLink>
      <span class="mx-1">/</span>
      <RouterLink class="hover:text-blue-400" to="#">Activity</RouterLink>
      <span class="mx-1">/</span>
      <RouterLink
        v-if="courseHeadersStore.useStudentsPage"
        class="hover:text-blue-400"
        to="#"
        >Student List</RouterLink
      >
      <span v-if="courseHeadersStore.useStudentsPage" class="mx-1">/</span>
      <RouterLink class="hover:text-blue-400" to="#">Export</RouterLink>
    </div>

    <div class="flex space-x-1 justify-end">
      <ActionButton
        text="Course Settings"
        @click.prevent="showCourseSettings = true"
      >
        <template #append>
          <Cog6ToothIcon class="h-4 w-4 ml-2" />
        </template>
      </ActionButton>
      <ActionButton
        text="Help"
        custom-bg="bg-yellow-500"
        text-color="text-white"
        custom-bg-on-hover="bg-yellow-400"
        @click.prevent="showHelper = true"
      >
        <template #append>
          <InformationCircleIcon class="h-4 w-4 ml-2" />
        </template>
      </ActionButton>
    </div>

    <CourseSettings
      v-if="showCourseSettings"
      v-model:show="showCourseSettings"
    />

    <PopUp
      v-if="showHelper"
      v-model:show="showHelper"
      header-title="Welcome Page"
      @hi="console.log('hi')"
    >
      <template #content>
        <!-- TODO: Change per route -->
        <p class="max-w-[480px] mb-4">
          From the Welcome Page, you can access the User Help Guide by clicking
          on “View Guide.” You start editing a course by clicking “Get Started”
          or selecting one of the website tabs at the top center of the page.
        </p>
        <p class="max-w-[480px] mb-4">
          To include a student roster in your course website, click “Course
          Settings” and select the “Use Student Pages” button (a green button
          indicates it is active).
        </p>
        <p class="max-w-[480px]">
          Please check the User Guide for more information. If you encounter any
          bugs please email a detailed description of the bug and its context to
          <strong>coursebuilderhelp@gmail.com</strong>
        </p>
      </template>
      <template #actions="{ close }">
        <div class="flex justify-end">
          <ActionButton
            text="OK"
            custom-bg="transparent"
            custom-bg-on-hover="bg-gray-100"
            @click.prevent="close"
          ></ActionButton>
        </div>
      </template>
    </PopUp>
  </header>
</template>

<style scoped></style>
