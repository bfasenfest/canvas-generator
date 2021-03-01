import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< Updated upstream
import Splash from 'components/Splash'
import Home from 'components/Home'
import NewHome from 'components/NewHome'
import NewWeeklyList from 'components/NewWeeklyList'
import Syllabus from 'components/Syllabus'
import Program from 'components/ProgramOverview'
import Weekly from 'components/Weekly'
import Zoom from 'components/Zoom'
import WeeklyList from 'components/WeeklyList'
import StudentsList from 'components/StudentsList'
import Student from 'components/Student'
import Export from 'components/Export'
import Guide from 'components/Guide'
import Credits from 'components/Credits'
=======
import Splash from 'components/pages/Splash'
import Home from 'components/pages/Home'
import NewHome from 'components/pages/NewHome'
import NewActivity from 'components/pages/NewActivity'
import NewSyllabus from 'components/pages/NewSyllabus'
import NewWeeklyList from 'components/pages/NewWeeklyList'
import NewStudentList from 'components/pages/NewStudentList'
import NewStudent from 'components/pages/NewStudent'
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
>>>>>>> Stashed changes

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome Page',
      component: Splash
    },
    {
      path: '/home',
      name: 'Home Template',
      component: Home
    },
    {
      path: '/home-new',
      name: 'New Home Template',
      component: NewHome
    },
    {
      path: '/weekly-new',
      name: 'New Weekly Template',
      component: NewWeeklyList
    },
    {
      path: '/syllabus',
      name: 'Syllabus Template',
      component: Syllabus
    },
    {
      path: '/weekly',
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
<<<<<<< Updated upstream
      path: '/activities',
=======
      path: '/newstudentlist',
      name: 'NewStudentList',
      component: NewStudentList
    },
    {
      path: '/newstudent',
      name: 'NewStudent',
      component: NewStudent
    },        
    {
      path: '/activities-old',
>>>>>>> Stashed changes
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
