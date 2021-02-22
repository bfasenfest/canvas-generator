
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import moment from "moment"


export default {

  computed: {
    ...mapGetters(['getInfo', 'getConfig', 'getTheme', 'getWeeks']),
    slotTypes(){
      return {...this.defaultSlotTypes, ...this.getConfig.slots.customSlots}
    },
    defaultSlotTypes(){
      return {
        titleSlot: {
          id: 1,
          name: "Title Slot",
          type: "title-slot",
          pages: '*',
          icon: "edit",
          colspan: 4,
          visible: true,        
          defaultData: {
            title: "Default Title",
            type: "h2"
          }
        },
        bannerSlot: {
          id: 2,
          name: "Banner Slot",
          type: "banner-slot",
          pages: '*',
          icon: "s-platform",
          colspan: 12,
          visible: true,
          defaultData: {
            title: "Default Title",
            semester: "U6411 // SPRING 2020"
          }
        },
        imageSlot: {
          id: 3,
          name: "Image Slot",
          type: "image-slot",
          pages: '*',
          icon: "picture",
          colspan: 4,
          visible: true,
          defaultData: {
            "imgSrc": "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/OGH_LogoWide.png",
            "width": "300",
            "height": "300"
          }
        },
        contentSlot: {
          id: 4,
          name: "Content Slot",
          type: "content-slot",
          pages: '*',
          icon: "menu",
          colspan: 4,
          visible: true,
          defaultData: {
            content: "Here you’ll find course materials and a range of tools to help you get the most out of the class. Please begin by reading the course syllabus, where you’ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester."
          }
        },
        spacerSlot: {
          id: 5,
          name: "Spacer Slot",
          type: "spacer-slot",
          pages: '*',
          icon: "menu",
          colspan: 4,
          visible: true,
          defaultData: {
            "useHR": true,
          }
        },
        buttonsSlot: {
          id: 6,
          name: "Buttons Slot",
          type: "buttons-slot",
          pages: ['home'],
          icon: "menu",
          colspan: 4,
          visible: true,
          defaultData: {
          }
        },
        nameValueSlot: {
          id: 8,
          name: "Name Value Slot",
          type: "name-value-slot",
          pages: '*',
          icon: "menu",
          colspan: 4,
          visible: true,
          getter: {
            value: "info.startDate"
          },
          defaultData: {
            name: "Title",
            getter: "info.startDate",
            nameStyle: {'font-weight': 'bold'}
          }
        },
        ActivityItemSlot: {
          id: 10,
          name: "Activity Item Slot",
          type: 'activity-item-slot',
          pages: '*',
          icon: "menu",
          visible: true,
          defaultData: {
            type: 'discussion',
            item: this.getWeeks[0].discussions[0]
          }
        },
        ActivityItemListSlot: {
          id: 11,
          name: "Activity Item List Slot",
          type: 'activity-item-list-slot',
          pages: '*',
          icon: "menu",
          visible: true,
          getter: {
            weekID: 'selectedWeekID'
          },
          defaultData: {
            type: 'all',
            // weekID: this.getWeeks[0].id
          }
        },
        VideoSlot: {
          id: 12,
          name: "Video Slot",
          type: 'video-slot',
          pages: '*',
          icon: "menu",
          visible: true,
          defaultData: {
            videoSrc: 'https://www.youtube.com/watch?v=GxSGKD50ioE',
          }
        },
        ActivityVideoListSlot: {
          id: 13,
          name: "Activity Video List",
          type: 'activity-video-list-slot',
          pages: '*',
          icon: "menu",
          visible: true,
          getter: {
            weekID: 'selectedWeekID'
          },
          defaultData: {
            // weekID: this.getWeeks[0].id
          }
        },
        CaseSlot: {
          id: 14,
          name: "Case Slot",
          type: 'case-slot',
          colspan: 12,
          pages: '*',
          icon: "menu",
          visible: true,
          defaultData: this.getWeeks[0].cases[0]
        },
        ListSlot: {
          id: 15,
          name: "List Slot",
          type: 'list-slot',
          pages: '*',
          icon: "menu",
          visible: false,
          defaultData: {
          }
        },
        ActivityTableSlot: {
          id: 16,
          name: "Activity Table Slot",
          type: 'activity-table-slot',
          pages: '*',
          icon: "menu",
          visible: true,
          defaultData: {
          }
        },
        InstructorList: {
          id: 17,
          name:"Instructor List",
          type: "simple-list-slot",
          pages: '*',
          icon: "picture",
          getter: "info.profs",
          width: 6,
          classes: [
            "pad-box-mini",
            "border",
            "border-tbl"
          ],
          defaultData: {
            idField: "id",
            labelField: "name",
            emailField: "email",
            type: "instructor-ta",
            title: "Instructor:",
            officeField: "office"
          }                    
        },
        TAList: {
          id: 18,
          name:"TA List",
          type: "simple-list-slot",
          pages: '*',
          icon: "picture",
          getter: "info.tas",
          width: 6,
          classes: [
            "pad-box-mini",
            "border",
            "border-tbl"
          ],
          defaultData: {
            idField: "id",
            labelField: "name",
            emailField: "email",
            type: "instructor-ta",
            title: "Teaching Assistant:",
            officeField: "office"
          }                    
        },
        instructorListSlot: {
          id: 9,
          name: "Expanded Instructors List",
          type: "instructor-list-slot",
          pages: '*',
          icon: "menu",
          colspan: 4,
          visible: true,
          defaultData: {
          }
        },
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['createSlotsFromArray','updateSlotTypes']),
    findSlot(objKey, objValue){
      for (const [name, slot] of Object.entries(this.slotTypes)){
        if (slot[objKey] == objValue) return slot
      }
    },
    createSlot(type, newData){
      let slotType = this.findSlot('type', type)
      return _.merge(slotType, newData)
    }    

  },
}
