import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    appRoutes: [],
    comments: [],
    spotsOfInterest: [],
    currentUser: -1, //Se o valor for -1, não está nenhum utilizador logado
    currentRoute: 0,
    numbero: 0

  },
  mutations: {
    /* CREATE_USER(state) {

    } */
    CREATE_NUM(state){
      state.numbero++
    }
  },
  getters: {
    getNum: state => {
      const top = state.scores.sort(
        function orderByLessAttempts(a, b) {
          if (a.attempts > b.attempts) return 1;
          if (a.attempts < b.attempts) return -1;
          else return 0;
        }
      )
      return top.slice(0, state.top)
    }

    
  }
  //modules: {}
});
