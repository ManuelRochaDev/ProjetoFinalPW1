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
    appRoutes: [{
      id: "",
      title: "",
      pois: [{
          id: 0,
          lat: 0,
          lng: 0,
          name: "Bacchus Wine Bar",
          audio: "", //aqui seria um link para o áudio
          img: "https://b.zmtcdn.com/data/pictures/8/18859338/2ef0c452a621c193425c98ef7db94ed5_featured_v2.jpg"
        },
        {
          id: 1,
          lat: 0,
          lng: 0,
          name: "Antonio's shop",
          audio: "",
          img: "https://rohanclinnick.files.wordpress.com/2013/11/shop-interior-photographer-london.jpg"
        }
      ]
    }],
    comments: [],
    spotsOfInterest: [],
    currentUserID: -1, //Se o valor for -1, não está nenhum utilizador logado
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
          usertype: payload.usertype
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
          state.currentUserID = user.id
          alert(state.currentUserID)
          localStorage.setItem("currentUserID", JSON.stringify(state.currentUserID))
          alert("login ok")
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
      state.currentUserID = -1
      localStorage.setItem("currentUserID", JSON.stringify(state.currentUserID));
      window.location.href = ".."

    },

    /**
     * Register all routes
     */
    ADD_ROUTE(state, payload) {
      if (!state.appRoutes.some(appRoute => appRoute.title === payload.title)) {
        state.appRoutes.push({
          id: payload.id,
          title: payload.title,
          city: payload.city,
          pois: payload.pois
        })
        localStorage.setItem("appRoutes", JSON.stringify(state.appRoutes))

        alert("new route");
        //window.history.back();
      } else {
        alert("Route already exists");
      }
    },

    

  },
  getters: {
    lastId(state) {
      if (state.users.length) {
        return state.users[state.users.length - 1].id
      } else {
        return 0
      }
    },
    getUserInfo(state) {
      for (const user of state.users) {
        if (user.id === state.id) {
          1 ==
            1
        }
      }
    },
    getLastRouteId(state) {
      if (state.appRoutes.length) {
        return state.appRoutes[state.appRoutes.length - 1].id
      } else {
        return 0
      }

    }
  }
});