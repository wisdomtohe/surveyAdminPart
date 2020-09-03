import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ListCourse from '../views/ListCourse.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ListSurvey from "../views/ListSurvey";
import SurveyQuestions from "../views/SurveyQuestions";
import Students from "../components/dashboard/Students";
import Teachers from "../components/dashboard/Teachers";
import Terms from "../components/dashboard/Terms";
import Classes from "../components/dashboard/Classes";
import Courses from "../components/dashboard/Courses";
import Questions from "../components/dashboard/Questions";
import Surveys from "../components/dashboard/Surveys";
import Users from "../components/dashboard/Users";

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {default: Home, header: Header, footer: Footer}
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: "/admin/",
    component: DashboardLayout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        name: 'students',
        path: 'students',
        component: Students
      },
      {
        name: 'teachers',
        path: 'teachers',
        component: Teachers
      },
      {
        name: 'filieres',
        path: 'filieres',
        component: Terms
      },
      {
        name: 'classes',
        path: 'classes',
        component: Classes
      },
      {
        name: 'courses',
        path: 'courses',
        component: Courses
      },
      {
        name: 'questions',
        path: 'questions',
        component: Questions
      },
      {
        name: 'surveys',
        path: 'surveys',
        component: Surveys
      },
      {
        name: 'users',
        path: 'users',
        component: Users
      }
    ]
  },
  {
    path: '/courses',
    name: 'listCourses',
    components: {default: ListCourse, header: Header, footer: Footer}
  },
  {
    path: '/profile',
    name: 'listCourses',
    components: {default: ListCourse, header: Header, footer: Footer}
  },
  {
    path: '/surveys',
    name: 'listSurveys',
    components: {default: ListSurvey, header: Header, footer: Footer}
  },
  {
    path: '/surveyQuestions/:id',
    name: 'surveyQuestions',
    components: {default: SurveyQuestions, header: Header, footer: Footer}
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
