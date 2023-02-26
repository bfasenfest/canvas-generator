
import { mapActions, mapGetters } from 'vuex'
import columnTypes from './col-types'
import _ from 'lodash'

export default {

  computed: {
    ...mapGetters(['getColumnsByRowID', 'getRowsByCID', 'getSlotsByColID', 'getConfig', 'getWeeks', 'getWeekByID','getWeekIndexByID','getWeekPropByID', 'getWeekPropGetter']),
    rowTypes(){
      return {...this.defaultRowTypes, ...this.getConfig.rows.customRows}
    },
    defaultRowTypes(){
      return {
        blankRow: {
          id: 0,
          name: 'Blank Row',
          type: 'blank-row',
          pages: '*',
          icon: 'circle-plus-outline'
        },
        homeWelcomeRow: {
          id: 1,
          name: "Home Welcome Row",
          type: 'home-welcome-row',
          icon: "s-home",
          pages: ['home'],
          array: [
            [['image-slot'], 'home-sidebar']
          ]
        },
        homeInstructorsRow: {
          id: 2,
          name: "Home Instructors",
          type: 'home-instructors-row',
          icon: "s-home",
          pages: ['home'],
          array: [
            [[this.slotTypes.InstructorList], [this.slotTypes.TAList]]
          ]
        },
        dateTimeRow: {
          id: 3,
          name: "Date/Time Row",
          type: "date-time-row",
          icon: "time",
          pages: ['home'],
          array: [
            ['date-time-col']
          ]
        },
        homeBannerRow: {
          id: 5,
          name: "Home Banner",
          type: "home-banner-row",
          icon: "picture",
          pages: ['home'],
          array: [
            ['home-banner-col']
          ]
        },
        simpleBannerRow: {
          id: 6,
          name: "Simple Banner",
          type: "banner-row",
          icon: "picture",
          sort: -2,
          array: [
            ['banner-col']
          ],
        },
        
        weeklyActivityListIntro: {
          id: 7,
          name: "Activity List Intro",
          type: "weekly-activity-list-intro",
          icon: "document",
          sort: -1,
          array: [
            ['activity-list-intro']
          ],
        },
        activityRow: {
          id: 8,
          name: "Activity Row",
          type: "activity-row",
          icon: "picture",
          array: [
            ['activity-image','activity-sidebar']
          ],
        },
        testExclusionRow: {
          id: 20,
          name: "Exluded Row",
          type: "excluded-row",
          icon: "document-copy",
          pages: ['syllabus'],
          array: [
            ['instructor-expanded-list']
          ]
        },
        titleBannerRow: {
          id: 6,
          name: "Title Banner",
          type: "title-banner-row",
          icon: "picture",
          sort: -2,
          array: [
            [this.simpleBannerCol({ banner: { getter: { title: 'info.title' } } })]
          ],
        },
      }
    },
    defaultContainerRows(){ 
    return {
      activity: [
        'title-banner-row',
        [this.activityIntroCol()],
        [['activity-video-list-slot']],
        ['case-list'],
        [['activity-item-list-slot']],
      ],
      syllabus: [
        'title-banner-row',
        [['instructor-list-slot']],
        [['spacer-slot']],
        'date-time-row',
        [this.syllabusComponentCol({title: {data: {title: 'Course Description'}}})],
        [this.syllabusComponentCol({title: {data: {title: 'Course Objectives'}}})],
        [this.syllabusComponentCol({title: {data: {title: 'Weekly Schedule'}}})],
        [['activity-table-slot']],
      ],
      home: [
        'home-banner-row',
        [['image-slot'], 'home-sidebar'],
        'home-instructors-row',
        'date-time-row',
      ],
      'activities-list': [
        'title-banner-row',
        'weekly-activity-list-intro'
      ]
    }
    }
  },
  mixins: [columnTypes],
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(['createRowsFromArray','updateRowTypes']),
    homeWelcomeRow(options){
      let row = _.cloneDeep(this.rowTypes.homeWelcomeRow.array)

      return row
    },
    homeInstructorsRow(options){
      let row = _.cloneDeep(this.rowTypes.homeInstructorsRow.array)

      return row
    },
    dateTimeRow(options){
      let row = _.cloneDeep(this.rowTypes.dateTimeRow)

      return row
    },
    listRow(options){
      let row = _.cloneDeep(this.rowTypes.listRow.array)

      return row
    },
    bannerRow(){
      let row = _.cloneDeep(this.rowTypes.bannerRow.array)

      return row
    },
    activityRow(index){
      let imageCol = this.activityImageCol({
          getter: {
            imgSrc: this.$store.state.imageServer + this.$store.state.info.classType.dateType.toLowerCase() + (index+1) + ".png",
          }
        })
      console.log(`week[${index}].title`)
      let sidebarCol = this.activitySidebarCol({
        title: {
          getter: {
            value: `weeks[${index}].title`
          },
        },
        date: {
          getter: {
            value: `weeks[${index}].date`
          },
        }
      })

      return [[{ width: 4, array: imageCol}, { width: 8, array: sidebarCol }]]
    },
    activityRowByID(id){
      let imageCol = this.activityImageCol({
          data: {
            linkID: id,
          },
          getter: {
          imgSrc: this.getWeekPropGetter('imgSrc', id),
          alt: this.getWeekPropGetter('title', id) // this.$store.state.imageServer + this.$store.state.info.classType.dateType.toLowerCase() + (this.getWeekIndexByID(id)+1) + ".png",
          }
        })
      let sidebarCol = this.activitySidebarCol({
        title: {
          data: {
            linkID: id
          },
          getter: {
            value: this.getWeekPropGetter('title', id) // {func: this.getWeekPropByID, props: ['title', id]}
          },
        },
        content: {
          getter: {
            content: this.getWeekPropGetter('description', id) // {func: this.getWeekPropByID, props: ['date', id] }
          },
        },
        date: {
          data:{
            name: 'Date',
          },
          getter: {
            value: this.getWeekPropGetter('date', id) // {func: this.getWeekPropByID, props: ['date', id] }
          },
        }
      })

      return [[{ width: 4, array: imageCol}, { width: 8, array: sidebarCol }]]
    },
    activityDefaultRowsByID(id){
      let videoListSlot = {
        type: "activity-video-list-slot",
        width: 12,
        data: {
          weekID: id
        },
        getter: {}
      }
      let itemListSlot = {
        type: "activity-item-list-slot",
        width: 12,
        data: {
          weekID: id
        },
        getter: {}
      }
      let caseSlot = {
        type: "list-slot",
        width: 12,
        data: {
          component: "case-slot",
        },
        getter: {
          items: this.getWeekPropGetter('cases', id)
        }
      }

      let introCol = _.cloneDeep(this.colTypes.activityListIntro.array)

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

      introCol[0] = _.merge(introCol[0], options.title)
      introCol[2] = _.merge(introCol[2], options.content)

      return [
        'title-banner-row',
        [introCol],
        [[videoListSlot]],
        [[caseSlot]],
        [[itemListSlot]],
      ]
    },
    findRow(objKey, objValue){
      for (const [name, row] of Object.entries(this.rowTypes)){
        if (row[objKey] == objValue) return row
      }
    }

  },
  beforeMount(){
    this.updateRowTypes(this.rowTypes)
    this.updateColTypes(this.colTypes)
    this.updateSlotTypes(this.slotTypes)
  }
}
