<script setup>
import { useCourseHeadersStore } from "../../stores/courseHeaders"

const courseStore = useCourseHeadersStore()
</script>

<template>
  <div :class="courseStore.organization.banner" style="padding: 40px">
    <img
      v-if="courseStore.organization.logo"
      :src="courseStore.organization.logo"
      style="margin-top: -10px; margin-left: 10px; height: 40px"
      alt="Organization Right Logo"
    />
    <img
      v-if="courseStore.organization.rightLogo"
      :src="courseStore.organization.rightLogo"
      style="float: right; height: 100px; margin-top: 10px;"
      alt="Organization Right Logo"
    />
    <p style="color: white; font-weight: 500; margin-top: 12px; margin-left: 40px; font-size: ;">{{ courseStore.semester }}</p>
  </div>
</template>
