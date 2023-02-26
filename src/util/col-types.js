
import { mapActions, mapGetters } from 'vuex'
import slotTypes from './slot-types.js'

import _ from 'lodash'

export default {

  computed: {
    ...mapGetters(['getColumnsByRowID', 'getRowsByCID', 'getSlotsByColID', 'getInfo', 'getWeeks', 'getConfig', 'getWeekPropGetter', 'getSelectedWeekID', 'getSelectedWeekPropGetter']),
    colTypes(){
      return {...this.defaultColTypes, ...this.getConfig.cols.customCols}
    },
    defaultColTypes(){
      return {
        blankCol: {
          id: 0,
          name: 'Blank Column',
          type: 'blank-col',
          pages: '*',          
          icon: 'circle-plus-outline'
        },        
        homeSidebar: {
          id: 1,
          name: "Home Sidebar",
          type: "home-sidebar",
          pages: '*',          
          icon: "picture",
          array: [
            {
              type: "name-value-slot",
              data: {
                name: "WELCOME TO",
                nameStyle: ""
              },
              getter: 'info.title',
              classes: ["STV1_Welcome"],
              styles: {
                "text-transform": "uppercase",
                "font-size": "14px !important",
                margin: "0px"
              }
            },
            {
              type: "content-slot",
              styles: {
                margin: "20px 0",
                padding: "0",
                "font-size": "14px"
              }
            },
            {
              type: "buttons-slot",
              styles: {
                margin: "10px 0 20px",
                padding: "0",
                "font-size": "14px"
              },
              data: {
                buttons: [
                  {
                    label: "Course Syllabus",
                    to: "/assignments/syllabus"
                  },
                  {
                    label: "Activities",
                    to: "/pages/activities"
                  },
                ]
              }
            }
          ],
        },
        simpleBanner: {
            id: 2,
            name: "Simple Banner",
            type: "banner-col",
            pages: '*',
            icon: "picture",                        
            array: [
              {
                type: "banner-slot",
                data: {
                  useWideBanner: false,
                },
              }
            ]
        },
        syllabusComponent: {
          id: 3,
          name:"Syllabus Component",
          type:"syllabus-component",
          pages: '*',
          icon: "picture",                    
          array:[
            {
              type: "title-slot",
            },
            {
              type: "content-slot",
              data: {
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus odio id aliquam vestibulum.'
              },
              styles: {
              }
            },
            {
              type: "spacer-slot",
              data: {
                useHR: true,
              }
            }
        ]
        },
        homeBanner:{
            id: 6,
            name: "Banner",
            type: "home-banner-col",
            pages: '*',            
            icon: "picture",
            array: [
              {
                type: "banner-slot",
                data: {
                  useWideBanner: true,
                },
                getter: {
                  title: "info.title",
                  semester:"info.semester"
                },
                styles: {
                  "margin-bottom": "20px",
                }
              }
            ]
        },
        dateTime: {
          id: 7,
          name: "Date Time Column",
          type: "date-time-col",
          pages: '*',
          icon: "picture",                    
          array:
            [
              {
                type: "name-value-slot",
                getter: "info.meetings",
                width: 12,
                data: {
                  name: "MEETING DATES / TIMES"
                },
                styles: {
                  margin: "20px 0"
                }
              },
              {
                type: "name-value-slot",
                getter: "info.discussions",
                data: {
                  name: "SPECIAL DISCUSSION FORUMS"
                },
                styles: {
                  "padding-bottom": "40px",
                  "margin-bottom": "20px",
                  "border-bottom": "1px solid #C7CDD1",
                }
              }
            ]
        },
        activityImage:{
          id: 9,
          name: "Activity Image",
          type: 'activity-image',
          pages: '*',
          visible: false,        
          icon: "picture",                    
          array: [
            {
              type: "image-slot",
              colspan: 4,
              width: 4,
              data: {
                imgSrc: "https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/session1.png",
                width: "360",
                height: "150"
              }
            }
          ]
        },
        activitySidebar:{
          id: 10,
          name: "Activity Sidebar",
          type: 'activity-sidebar',
          pages: '*',
          icon: "picture",                    
          width: 8,
          array: [
            {
              width: 8,
              type: "name-value-slot",
              classes: ["STV1_Welcome"],
              data: {
                name: "Session",
                value: 'Title'
              },
            },
            {
              width: 8,
              type: "content-slot",
              styles: {
                margin: "20px 0",
                padding: "0",
                "font-size": "14px"
              },
              data: {
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus odio id aliquam vestibulum."
              }
            },
            {
              width: 8,
              type: "name-value-slot",
              data: {
                name: "Class",
                type: 'date',
                value: this.getInfo.startDate
              },
            },
          ]
        },
        caseList: {
          id: 11,
          name: "Case List",
          type: 'case-list',
          pages: '*',
          icon: "picture",                    
          array: [
            {
              type: "list-slot",
              width: 12,
              data: {
                component: "case-slot",
                // items: this.getWeeks[0].cases
              },
              getter: {
                items: this.getSelectedWeekPropGetter('cases')
              }
            }
          ]
        },
        activityListIntro: {
          id: 12,
          name:"Activity Intro",
          type:"activity-list-intro",
          pages: '*',
          icon: "picture",                    
          array:[
            {
              type: "title-slot",
              data: {
                type: 'h3',
                title: 'ACTIVITIES'
              },
              classes: ['ic-image-text-combo__text']
            },
            {
              type: "spacer-slot",
              data: {
                useHR: true,
              }
            },
            {
              type: "content-slot",
              data: {
                content: "Welcome to the activities page! Below you'll find an overview of all the sessions in this course, each covering a distinct topic. Clicking on a session will take you to a page where you can review the activities related to that session."
              },
              styles: {
              }
            },
            {
              type: "spacer-slot",
              data: {
                useHR: true,
              }
            }
        ]
        },
        testCol:{
          id: 100,
          name: "Test Col",
          type: 'test',
          pages: '*',
          icon: 'picture',
          array: [
            {
              type: "name-value-slot",
              data: {
                name: "Session",
              },
              getter: 'info.semester'
            },
          ]
        }

      }
    }
  },
  mixins: [slotTypes],  
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['createColumnsFromArray','updateColTypes']),
    homeSidebarCol(options = {}){
      let column = _.cloneDeep(this.colTypes.homeSidebar.array)
      // overwrite data with anything specifically added to the options parameter, initally for the title
      column[0] = _.merge(column[0], options.title)
      column[1] = _.merge(column[1], options.content)
      column[2] = _.merge(column[2], options.button)

      return column
    },
    instructorListCol(options = {}){
      let column = _.cloneDeep(this.colTypes.instructorList.array)

      column[0] = _.merge(column[0], options.list)

      return column
      // let columns = [column]
      // this.createColumnsFromArray({columns, rid})
    },
    simpleBannerCol(options = {}){
      let column = _.cloneDeep(this.colTypes.simpleBanner.array)

      column[0] = _.merge(column[0], options.banner)

      return column
    },
    buildBannerCol(options = {}){
      let column = _.cloneDeep(this.colTypes.banner.array)
      let {cid, rid} = options

      column[0] = _.merge(column[0], options.banner)

      return column
    },
    syllabusComponentCol(options){
      let column = _.cloneDeep(this.colTypes.syllabusComponent.array)

      column[0] = _.merge(column[0], options.title)
      column[1] = _.merge(column[1], options.content)
      column[2] = _.merge(column[2], options.spacer)


      return column
    },
    activityImageCol(options = {}){
      let column = _.cloneDeep(this.colTypes.activityImage.array)

      column[0] = _.merge(column[0], options)

      return column
    },
    activitySidebarCol(options = {}){
      let column = _.cloneDeep(this.colTypes.activitySidebar.array)

      column[0] = _.merge(column[0], options.title)
      column[1] = _.merge(column[1], options.content)
      column[2] = _.merge(column[2], options.date)

      return column
    },
    activityIntroListCol(options = {}){
      let column = _.cloneDeep(this.colTypes.activityListIntro.array)

      column[0] = _.merge(column[0], options.title)
      column[1] = _.merge(column[2], options.content)
      return column
    },
    activityIntroCol(){
      let column = _.cloneDeep(this.colTypes.activityListIntro.array)

      let options = {
        title: {
          getter: {
            title: this.getSelectedWeekPropGetter('title')
          }
        },
        content : {
          data:{
            editorType: 'Tiny'
          },
          getter: {
            content: this.getSelectedWeekPropGetter('body')
          }
        }
      }

      column[0] = _.merge(column[0], options.title)
      column[2] = _.merge(column[2], options.content)
      return column
    },
    activityIntroColByID(id){
      let column = _.cloneDeep(this.colTypes.activityListIntro.array)

      let options = {
        title: {
          getter: {
            title: this.getWeekPropGetter('title', id)
          }
        },
        content : {
          data:{
            editorType: 'Tiny'
          },
          getter: {
            content: this.getWeekPropGetter('body', id)
          }
        }
      }

      column[0] = _.merge(column[0], options.title)
      column[2] = _.merge(column[2], options.content)
      return column
    },

    findCol(objKey, objValue){
      for (const [name, col] of Object.entries(this.colTypes)){
        if (col[objKey] == objValue) return col
      }
    }
  },
  beforeMount(){
    this.updateColTypes(this.colTypes)
  }
}
