import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    userEntity: null,
    userRole: '',
    // backendHostName: "http://ec2-18-224-141-43.us-east-2.compute.amazonaws.com",
    backendHostName: " http://localhost:8080",
    currentSurvey: {},
    surveyAnswerSubmitted: true
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info;
      Vue.$cookies.set('user', info);
      if(info === null)
        Vue.$cookies.remove('user');
    },
    setUserEntity(state, entity) {
      state.userEntity = entity;
      Vue.$cookies.set('userEntity', entity);
      if(entity === null)
        Vue.$cookies.remove('userEntity');
    },
    setUserRole(state, role) {
      state.userRole = role;
      console.log("role set!!!!!!!!!");
    },
    setCurrentSurvey(state, survey) {
      state.currentSurvey = survey;
      console.log("set!!!!!!!!!");
    },

    setSurveyAnswerSubmitted(state, value) {
      state.currentSurvey = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
