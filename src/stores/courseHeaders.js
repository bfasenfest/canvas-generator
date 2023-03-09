import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useCourseHeadersStore = defineStore("courseHeaders", () => {
  const title = ref("")
  const courseUrl = ref("")
  const id = ref("")

  const classType = ref({
    dataType: "Session",
    option: "Weekly Course",
  })

  const courseDate = ref("")
  const instructorName = ref("")
  const instructorEmail = ref("")

  const meetingDate = ref("")
  const meetingSpecialDiscussionDates = ref("")

  const organization = ref({
    option: "Columbia",
    banner: "MM",
    slim: "MM_Slim",
    logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/Columbia_Logo_hq.png",
    primary: "#008EE2",
  })
  const semester = ref("U6411 // SPRING 2023")

  const availableThemes = computed(() => [
    {
      option: "Columbia",
      banner: "MM",
      slim: "MM_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/Columbia_Logo_hq.png",
      primary: "#008EE2",
    },
    {
      option: "SIPA",
      banner: "SIPA",
      wide: "WIDE",
      slim: "SIPA_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/SIPA_Logo_hq.png",
      primary: "#008EE2",
    },
    {
      option: "Social Work",
      banner: "SSW",
      slim: "SSW_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/SSW_logo.png",
      primary: "#008EE2",
    },
    {
      option: "Mailman",
      banner: "MM",
      slim: "MM_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/MM_logo2.png",
      primary: "#008EE2",
    },
    {
      option: "Journalism",
      banner: "Banner_Journalism",
      slim: "Banner_Journalism_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/journalism_logo_hq.png",
      primary: "#008EE2",
    },
    {
      option: "Climate",
      banner: "Banner_Climate",
      slim: "Banner_Climate_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/climate_logo_hq.png",
      primary: "#008EE2",
    },
    {
      option: "Engineering",
      banner: "Banner_Engineering",
      slim: "Banner_Engineering_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/engineering_logo_hq.png",
      primary: "#008EE2",
    },
    {
      option: "Istari",
      banner: "Banner_Istari",
      slim: "Banner_Istari_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/Istari_Logo.png",
      primary: "#1F1347",
    },
    {
      option: "Acountability Lab",
      banner: "Banner_AL",
      slim: "Banner_AL_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/AL_Logo.png",
      primary: "#671E20",
    },
    {
      option: "Center for Open Data Enterprise",
      banner: "Banner_CODE",
      slim: "Banner_CODE_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/Code_Logo.png",
      primary: "#0F084E",
    },
    {
      option: "Collaborating for Resilience",
      banner: "Banner_CORE",
      slim: "Banner_CORE_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/Core_Logo.png",
      primary: "#483D69",
    },
    {
      option: "Development Gateway",
      banner: "Banner_DG",
      slim: "Banner_DG_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/DG_Logo.png",
      primary: "#0193D3",
    },
    {
      option: "Dullah Omar Institute",
      banner: "Banner_DOI",
      slim: "Banner_DOI_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/DOI_Logo.png",
      primary: "#1E2E5A",
    },
    {
      option: "Feedback Labs",
      banner: "Banner_Feedback",
      slim: "Banner_Feedback_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/Feedback_Logo.png",
      primary: "#3598DB",
    },
    {
      option: "Global Integrity",
      banner: "Banner_GI",
      slim: "Banner_GI_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/GI_Logo.png",
      primary: "#5A5855",
    },
    {
      option: "Open Government Partnership",
      banner: "Banner_OGP",
      slim: "Banner_OGP_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/OGP_Logo.png",
      primary: "#000000",
    },
    {
      option: "Pact",
      banner: "Banner_Pact",
      slim: "Banner_Pact_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/Pact_Logo.png",
      primary: "#74005F",
    },
    {
      option: "PSAM",
      banner: "Banner_PSAM",
      slim: "Banner_PSAM_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/PSAM_Logo.png",
      primary: "#8181A1",
    },
    {
      option: "Rapid Results Institute",
      banner: "Banner_RRI",
      slim: "Banner_RRI_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/RRI_Logo.png",
      primary: "#990000",
    },
    {
      option: "Open Gov Hub",
      banner: "OGH",
      slim: "OGH_Slim",
      logo: "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/govhub_logo_small.png",
      rightLogo:
        "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/govhub_bubbles70.png",
      primary: "#6995c2",
    },
  ])

  const useStudentsPage = ref(false)

  // --- Config Modal Editables --- //
  function setTitle(val) {
    title.value = val
  }
  function setCourseUrl(val) {
    courseUrl.value = val
  }
  function setId(val) {
    id.value = val
  }
  function setOrganization(val) {
    organization.value = val
  }
  function setUseStudentsPage(val) {
    useStudentsPage.value = val
  }

  // --- Only Home Course Editable --- //
  function setCourseDate(val) {
    courseDate.value = val
  }
  function setInstructorName(val) {
    instructorName.value = val
  }
  function setInstructorEmail(val) {
    instructorEmail.value = val
  }

  function setMeetingDate(val) {
    meetingDate.value = val
  }
  function setMeetingSpecialDiscussionDates(val) {
    meetingSpecialDiscussionDates.value = val
  }

  function setSemester(val) {
    semester.value = val
  }

  return {
    // State
    id,
    title,
    courseUrl,
    classType,
    organization,
    useStudentsPage,

    courseDate,
    instructorName,
    instructorEmail,

    meetingDate,
    meetingSpecialDiscussionDates,

    semester,

    // Computed Getters
    availableThemes,

    // Actions
    setId,
    setTitle,
    setCourseUrl,
    setOrganization,
    setUseStudentsPage,

    setCourseDate,
    setInstructorName,
    setInstructorEmail,

    setMeetingDate,
    setMeetingSpecialDiscussionDates,

    setSemester,
  }
})
