import Vue from 'vue'
import Router from 'vue-router'
import Splash from 'components/pages/Splash'
import Home from 'components/pages/Home'
import NewHome from 'components/pages/NewHome'
import NewActivity from 'components/pages/NewActivity'
import NewSyllabus from 'components/pages/NewSyllabus'
import NewWeeklyList from 'components/pages/NewWeeklyList'
import ModulePage from 'components/pages/ModulePage'
import Syllabus from 'components/pages/Syllabus'
import Program from 'components/pages/ProgramOverview'
import Weekly from 'components/pages/Weekly'
import Zoom from 'components/pages/Zoom'
import WeeklyList from 'components/pages/WeeklyList'
import StudentsList from 'components/pages/StudentsList'
import Student from 'components/pages/Student'
import Export from 'components/pages/Export'
import Guide from 'components/pages/Guide'
import Credits from 'components/pages/Credits'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome Page',
      component: Splash
    },
    {
      path: '/home-old',
      name: 'Home Template',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: NewHome
    },
    {
      path: '/modules',
      name: 'Module Builder',
      component: ModulePage
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
      name: 'New Syllabus Template',
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
      name: 'Activities',
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
