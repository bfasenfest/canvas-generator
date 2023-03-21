<script setup>
import { ref } from "vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"
import { useCourseHeadersStore } from "../../stores/courseHeaders"
import useEmitter from "../../composables/useEmitter"

const courseStore = useCourseHeadersStore()
const emitter = useEmitter()

const showMeetingInput = ref(false)
const showMeetingSpecialInput = ref(false)

const meetingDate = ref(courseStore.meetingDate)
const meetingSpecialDiscussionDates = ref(
  courseStore.meetingSpecialDiscussionDates
)

function switchMeetingVisibility() {
  meetingDate.value = courseStore.meetingDate
  showMeetingInput.value = !showMeetingInput.value
}

function switchSpecialMeetingVisibility() {
  meetingSpecialDiscussionDates.value =
    courseStore.meetingSpecialDiscussionDates
  showMeetingSpecialInput.value = !showMeetingSpecialInput.value
}

function updateMeetingDate() {
  courseStore.setMeetingDate(meetingDate.value)
  showMeetingInput.value = false
  emitter.emit("refresh-meeting-date")
}

function updateMeetingSpecialDiscussionDates() {
  courseStore.setMeetingSpecialDiscussionDates(
    meetingSpecialDiscussionDates.value
  )
  showMeetingSpecialInput.value = false
  emitter.emit("refresh-special-meeting-date")
}
</script>

<template>
  <div style="padding: 1.75rem 12px 1.75rem 12px; background-color: white">
    <div style="display: flex; align-items: center; min-height: 40px">
      <span style="font-weight: 700; margin-right: 4px">
        MEETING DATES / TIMES:
      </span>
      <div
        v-if="showMeetingInput"
        class="flex space-x-2"
        @keyup.esc="switchMeetingVisibility"
      >
        <button
          class="rounded-full bg-red-400 text-white h-8 w-8 p-1 my-auto"
          @click.prevent="switchMeetingVisibility"
        >
          <XMarkIcon />
        </button>
        <input
          autofocus
          type="text"
          v-model="meetingDate"
          class="rounded-lg bg-gray-100 px-2"
        />
        <button
          class="rounded-lg bg-blue-500 text-white px-4 py-2"
          @click.prevent="updateMeetingDate"
        >
          Save
        </button>
      </div>
      <p v-else @dblclick="switchMeetingVisibility">
        {{ courseStore.meetingDate }}
      </p>
    </div>

    <div style="display: flex; align-items: center; min-height: 40px">
      <span style="font-weight: 700; margin-right: 4px">
        SPECIAL DISCUSSION FORUMS:
      </span>
      <div
        v-if="showMeetingSpecialInput"
        class="flex space-x-2"
        @keyup.esc="switchSpecialMeetingVisibility"
      >
        <button
          class="rounded-full bg-red-400 text-white h-8 w-8 p-1 my-auto"
          @click.prevent="switchSpecialMeetingVisibility"
        >
          <XMarkIcon />
        </button>
        <input
          autofocus
          type="text"
          v-model="meetingSpecialDiscussionDates"
          class="rounded-lg bg-gray-100 px-2"
        />
        <button
          class="rounded-lg bg-blue-500 text-white px-4 py-2"
          @click.prevent="updateMeetingSpecialDiscussionDates"
        >
          Save
        </button>
      </div>
      <p v-else @dblclick="switchSpecialMeetingVisibility">
        {{ courseStore.meetingSpecialDiscussionDates }}
      </p>
    </div>
  </div>
</template>

<style></style>
