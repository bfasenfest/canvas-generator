import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/components/pages/Splash.vue'
import Home from '@/components/pages/Home.vue'
import NewHome from '@/components/pages/NewHome.vue'
import NewActivity from '@/components/pages/NewActivity.vue'
import NewSyllabus from '@/components/pages/NewSyllabus.vue'
import NewWeeklyList from '@/components/pages/NewWeeklyList.vue'
import Syllabus from '@/components/pages/Syllabus.vue'
import Program from '@/components/pages/ProgramOverview.vue'
import Weekly from '@/components/pages/Weekly.vue'
import Zoom from '@/components/pages/Zoom.vue'
import WeeklyList from '@/components/pages/WeeklyList.vue'
import StudentsList from '@/components/pages/StudentsList.vue'
import Student from '@/components/pages/Student.vue'
import Export from '@/components/pages/Export.vue'
import Guide from '@/components/pages/Guide.vue'
import Credits from '@/components/pages/Credits.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome Page',
      component: Splash
    },
    {
      path: '/home-old',
      name: 'Old Home Template',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: NewHome
    },
    {
      path: '/activity',
      name: 'Activity',
      component: NewActivity
    },
    {
      path: '/activities',
      name: 'Activities',
      component: NewWeeklyList
    },
    {
      path: '/syllabus-old',
      name: 'Syllabus',
      component: Syllabus
    },
    {
      path: '/syllabus',
      name: 'Syllabus Template',
      component: NewSyllabus
    },
    {
      path: '/weekly-old',
      name: 'Weekly Activity',
      component: Weekly
    },
    {
      path: '/program',
      name: 'Program Overview',
      component: Program
    },
    {
      path: '/studentlist',
      name: 'Student List',
      component: StudentsList
    },
    {
      path: '/student',
      name: 'Student',
      component: Student
    },
    {
      path: '/activities-old',
      name: 'OldActivities',
      component: WeeklyList
    },
    {
      path: '/zoom',
      name: 'Zoom',
      component: Zoom
    },
    {
      path: '/export',
      name: 'Export',
      component: Export
    },
    {
      path: '/guide',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/credits',
      name: 'Credits',
      component: Credits
    }
  ]
})
