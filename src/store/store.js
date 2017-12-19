import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import defaults from './components/defaults'
import theme from './components/theme'

Vue.use(Vuex);

var moment = require('moment');

export default new Vuex.Store({
  state: {

    //DEFAULTS AND THEME ALSO INJECTED HERE THROUGH MODULES

    //GENERAL COURSE INFO
    info: {
      // COURSE INFO
      title: "Global Food Systems",
      courseUrl: "https://courseworks2.columbia.edu/courses/29191/",
      semester: "U6411 // SPRING 2017",
      //TIME INFO
      startDate: null,
      dateType: "Week",
      dateLength: "12",
      //TEACHERS
      prof: {
        name: 'Jane Professor',
        email: 'professor@sipa.columbia.edu',
        office: 'Office Hours: Monday 3:00-6:00 pm (IAB Room 1234)'
      },
      ta: {
        name: 'Joe TA',
        email: 'ta@sipa.columbia.edu',
        office: 'Office Hours: Tuesday 1:00-3:00 pm (IAB Room 1234)'
      },
      //DISPLAY PARAMETERS
      video:"https://vimeo.com/199382848/1dd8fc0f31",
      image:"http://assets.ce.columbia.edu/i/ce/intl/intl-fp@2x.jpg",
      meetings: "Tuesday 9:00-10:50 am (IAB Room 411)",
      discussions: "Thursday 9:00-10:50 am (IAB Room 411)",
      description: "Here you’ll find course materials and a range of tools to help you get the most out of the class. \n Please begin by reading the course syllabus, where you’ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester."
    },

    // UTILS
    imageServer: "https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/",
  },
  getters: {
    getInfo: state => state.info
  },
  mutations: {
    updateInfo: (state, payload) => {
      state.info = payload
    }
  },
  modules: {
    defaults,
    theme
  },
  plugins: [createPersistedState()]
})
