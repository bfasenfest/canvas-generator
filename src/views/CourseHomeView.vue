<script setup>
import { ref, onMounted, watch, markRaw } from "vue"
import { nanoid } from 'nanoid'

import { useCourseHeadersStore } from "../stores/courseHeaders"

import useEmitter from "../composables/useEmitter"

import CustomInputText from "../components/CustomInputText.vue"
// import ActionButton from "../components/ActionButton.vue"
import CustomOrganizationSelect from "../components/CustomOrganizationSelect.vue"
import DraggingCanvas from "../components/DraggingCanvas.vue"

import BannerImage from "../components/dynamicComponents/BannerImage.vue"
import InstructorInfo from "../components/dynamicComponents/InstructorInfo.vue"
import MeetingTimes from "../components/dynamicComponents/MeetingTimes.vue"

const courseHeadersStore = useCourseHeadersStore()
const emitter = useEmitter()

const headers = ["Course Info", "Instructors", "Meeting Times", "Banner"]
const selectedHeader = ref("Course Info")

const courseInfoData = ref({ title: "", id: "", url: "" })
const instructorsData = ref({ name: "", email: "", date: "" })
const meetingTimesData = ref({ dates: "", specialDiscussionDates: "" })
const semester = ref("")

// Refresh UI Values
const refreshSemesterInput = ref(false)
const refreshMeetingTimesInput = ref(false)
const refreshMeetingSpecialTimesInput = ref(false)

const content = ref([
  [
    [
      {
        name: markRaw(BannerImage),
        dynamic: true,
      },
    ],
  ],
  [
    [
      {
        html: `<img src="https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/campus.jpg" alt="Course Home Image" width="485" height="302">`,
        id: nanoid(),
        type: 'img',
        edit: false
      }
    ],
    [
      {
        html: `<h4 style="font-weight: bold;font-size: 1.125rem;line-height: 1.75rem;padding: 12px 12px 24px 12px;background-color: #F5F5F5;">Welcome To</h4><p style="padding: 4px;">Congratulations on signing up for a self-paced course with unlimited attempts for graded assessments. These lessons are an excellent opportunity to improve your self-reflection, connect with classmates, and enhance your knowledge and aptitudes with material created by the faculty at Columbia University. To begin, click on the Modules Overview to review the modules presented in this course.</p>`,
        id: nanoid(),
        edit: false,
      },
    ],
  ],
  [
    [
      {
        name: markRaw(InstructorInfo),
        dynamic: true,
      },
      {
        name: markRaw(MeetingTimes),
        dynamic: true,
      },
    ],
  ],
])

onMounted(() => {
  emitter.on("refresh-semester", () => {
    semester.value = courseHeadersStore.semester

    if (selectedHeader.value === "Banner") {
      // This is to re render semester input, bc it's value is binded by previous attrs
      refreshSemesterInput.value = !refreshSemesterInput.value
      setTimeout(
        () => (refreshSemesterInput.value = !refreshSemesterInput.value),
        10
      )
    }
  })

  emitter.on("refresh-meeting-date", () => {
    meetingTimesData.value.dates = courseHeadersStore.meetingDate

    if (selectedHeader.value === "Meeting Times") {
      refreshMeetingTimesInput.value = !refreshMeetingTimesInput.value
      setTimeout(
        () =>
          (refreshMeetingTimesInput.value = !refreshMeetingTimesInput.value),
        10
      )
    }
  })

  emitter.on("refresh-special-meeting-date", () => {
    meetingTimesData.value.specialDiscussionDates =
      courseHeadersStore.meetingSpecialDiscussionDates

    if (selectedHeader.value === "Meeting Times") {
      refreshMeetingSpecialTimesInput.value =
        !refreshMeetingSpecialTimesInput.value
      setTimeout(
        () =>
          (refreshMeetingSpecialTimesInput.value =
            !refreshMeetingSpecialTimesInput.value),
        10
      )
    }
  })

  courseInfoData.value = {
    title: courseHeadersStore.title,
    id: courseHeadersStore.id,
    url: courseHeadersStore.courseUrl,
  }

  instructorsData.value = {
    name: courseHeadersStore.instructorName,
    email: courseHeadersStore.instructorEmail,
    date: courseHeadersStore.courseDate,
  }

  meetingTimesData.value = {
    dates: courseHeadersStore.meetingDate,
    specialDiscussionDates: courseHeadersStore.meetingSpecialDiscussionDates,
  }

  semester.value = courseHeadersStore.semester
})

function updateBanner(organization) {
  courseHeadersStore.setOrganization(organization)
}

watch(
  courseInfoData,
  (val) => {
    courseHeadersStore.setTitle(val.title)
    courseHeadersStore.setCourseUrl(val.url)
    courseHeadersStore.setId(val.id)
  },
  { deep: true }
)

watch(
  instructorsData,
  (val) => {
    courseHeadersStore.setInstructorName(val.name)
    courseHeadersStore.setInstructorEmail(val.email)
    courseHeadersStore.setCourseDate(val.date)
  },
  { deep: true }
)

watch(
  meetingTimesData,
  (val) => {
    courseHeadersStore.setMeetingDate(val.dates)
    courseHeadersStore.setMeetingSpecialDiscussionDates(
      val.specialDiscussionDates
    )
  },
  { deep: true }
)

watch(semester, (val) => courseHeadersStore.setSemester(val))
</script>

<template>
  <main>
    <!-- Content Inputs Navbars -->
    <div class="relative">
      <div class="flex justify-between max-w-[500px] mx-auto mt-4">
        <p
          v-for="header in headers"
          :id="header"
          class="text-center pb-2 px-2 cursor-pointer text-xs md:text-base"
          :class="{
            'border-b-2 border-blue-400 underline hover:no-underline':
              selectedHeader === header,
          }"
          @click.prevent="selectedHeader = header"
        >
          {{ header.toUpperCase() }}
        </p>
      </div>
      <div class="absolute bottom-0 bg-black/10 h-[2px] w-full"></div>
    </div>

    <!------ HEADERS INPUTS ------>
    <!-- Course Info Inputs -->
    <div
      v-if="selectedHeader === 'Course Info'"
      class="grid grid-cols-1 md:grid-cols-3 gap-2 px-4 max-w-[1200px] mx-auto mt-2"
    >
      <CustomInputText
        id="courseInfoTitleInput"
        label="Course Title"
        tooltip-hint-text="Course Title"
        placeholder="Input your course title here"
        v-model:value="courseInfoData.title"
      />
      <CustomInputText
        id="courseInfoIdInput"
        label="Course ID"
        tooltip-hint-text="Course ID"
        placeholder="Input your course ID here"
        v-model:value="courseInfoData.id"
      />
      <CustomInputText
        id="courseInfoURLInput"
        label="Course URL"
        tooltip-hint-text="Course URL"
        placeholder="Input your course URL here"
        v-model:value="courseInfoData.url"
      />
    </div>

    <!-- Instructor Info Inputs -->
    <div
      v-else-if="selectedHeader === 'Instructors'"
      class="grid grid-cols-1 md:grid-cols-6 gap-2 px-4 max-w-[1200px] mx-auto mt-2"
    >
      <CustomInputText
        class="col-span-1"
        id="instructorsDataNameInput"
        label="Instructor Name"
        tooltip-hint-text="Instructor Name"
        placeholder="Input the instructor name here"
        v-model:value="instructorsData.name"
      />
      <CustomInputText
        class="col-span-1 md:col-span-2"
        id="instructorsDataEmailInput"
        label="Instructor Email"
        tooltip-hint-text="Instructor Email"
        placeholder="Input the instructor email here"
        v-model:value="instructorsData.email"
      />
      <CustomInputText
        class="col-span-1 md:col-span-3"
        id="instructorsDataCourseDateInput"
        label="Course Date"
        tooltip-hint-text="Course Date"
        placeholder="Input the course date here"
        v-model:value="instructorsData.date"
      />
    </div>

    <!-- Meeting Times Inputs -->
    <div
      v-else-if="selectedHeader === 'Meeting Times'"
      class="grid grid-cols-1 md:grid-cols-12 gap-2 px-4 max-w-[1200px] mx-auto mt-2"
    >
      <CustomInputText
        v-if="!refreshMeetingTimesInput"
        class="col-span-1 md:col-span-6"
        id="meetingTimesDataDatesInput"
        label="Meeting Date"
        tooltip-hint-text="Meeting Date"
        placeholder="Input the meeting dates here"
        v-model:value="meetingTimesData.dates"
      />
      <CustomInputText
        v-if="!refreshMeetingSpecialTimesInput"
        class="col-span-1 md:col-span-6"
        id="meetingTimesDataSpecialDiscussionDatesInput"
        label="Meeting Special Discussion Dates"
        tooltip-hint-text="Meeting Special Discussion Dates"
        placeholder="Input the special discussion dates here"
        v-model:value="meetingTimesData.specialDiscussionDates"
      />
      <!-- <ActionButton
        class="col-span-1 md:col-span-2 md:mt-8"
        text="Hide Meetings"
        custom-bg="bg-red-500"
        custom-bg-on-hover="bg-red-400"
        text-color="text-white"
      /> -->
    </div>

    <!-- Banner Organization Input -->
    <div
      v-else
      class="px-4 max-w-[900px] grid gap-2 md:grid-cols-10 mx-auto mt-2"
    >
      <CustomOrganizationSelect
        class="col-span-1 md:col-span-4"
        label="Banner Image"
        id="BannerImageSelectInput"
        @update:value="updateBanner"
      />
      <CustomInputText
        v-if="!refreshSemesterInput"
        class="col-span-1 md:col-span-6"
        id="bannerDataSemesterInput"
        label="Semester"
        tooltip-hint-text="Semester"
        placeholder="Input semester here"
        v-model:value="semester"
      />
    </div>
    <!------ END OF HEADERS INPUTS ------>

    <DraggingCanvas v-model:content="content" />
  </main>
</template>

<style></style>
