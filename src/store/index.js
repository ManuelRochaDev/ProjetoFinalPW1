import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [{
      id: 0,
      email: "admin@admin.com",
      name: "Manuel",
      lastName: "Rocha",
      password: "123",
      userType: 0
    }],
    appRoutes: [],
    comments: [],
    spotsOfInterest: [],
    currentUser: [], //Se o valor for -1, não está nenhum utilizador logado
    currentRoute: 0,
    credCorrect: false

  },
  mutations: {
    REGISTER_USER(state, payload) {

      if (!state.users.some(user => user.email === payload.email)) {

        state.users.push({
          id: payload.id,
          email: payload.email,
          name: payload.name,
          lastName: payload.lastName,
          password: payload.password,
          userType: payload.userType
        })
        localStorage.setItem("users", JSON.stringify(state.users))
        alert("register ok");
        //window.history.back();

      } else {
        alert("existing email");
      }
    },

    LOGIN(state, payload) {
      for (const user of state.users) {
        if (user.email === payload.email && user.password === payload.password) {
          state.currentUser.push({
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: payload.email,
            password: payload.password,
            userType: user.userType
            
          }),
          alert("login ok")
          localStorage.setItem("currentUser", JSON.stringify(this.state.currentUser))
          
          state.credCorrect = true
          /* if (user.userType === "admin") {
            window.location.href = "../views/Home.vue#/adminHome"
          } else if (user.userType === "cliente") {
            window.location.href = "../views/Home.vue"
          } */
        }

        if (state.userExists === false) {
          alert("Credenciais Inválidas");
        } else {
          state.credCorrect = false;
        }
      }
    },

    LOGOUT(state) {
      state.currentUser.pop();
      localStorage.removeItem("currentUser", JSON.stringify(this.state.currentUser));
      //window.location.href = ".."

    }

  },
  getters: {
    name(state) {
      return state.currentUser[0].name;
    },
    lastName(state) {
      return state.currentUser[0].lastName;
    },
    email(state) {
      return state.currentUser[0].email;
    },
    userType(state) {
      return state.currentUser[0].userType;
    },
    lastId(state) {
      if (state.users.length) {
        return state.users[state.users.length - 1].id
      } else {
        return 0
      }
    }
  }
  //modules: {}
});
