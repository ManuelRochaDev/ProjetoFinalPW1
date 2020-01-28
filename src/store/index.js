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
      city: "",
    }],
    pois: [{
      idRoute: 1,
      lat: 0,
      lng: 0,
      name: "Bacchus Wine Bar",
      audio: "", //aqui seria um link para o áudio
      img: "https://b.zmtcdn.com/data/pictures/8/18859338/2ef0c452a621c193425c98ef7db94ed5_featured_v2.jpg"
    },
    {
      idRoute: 2,
      lat: 0,
      lng: 0,
      name: "Antonio's shop",
      audio: "",
      img: "https://rohanclinnick.files.wordpress.com/2013/11/shop-interior-photographer-london.jpg"
    }],
    comments: [],
    spotsOfInterest: [],
    currentUser: [], //Se o valor for -1, não está nenhum utilizador logado
    currentRoute: 0,
    credCorrect: false,
    currentPath: "/percursos"
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
        localStorage.setItem("users", JSON.stringify(this.state.users))
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
            window.location.href = "../views/admin"
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

    },

    /**
     * Register all routes
     */
    ADD_ROUTE(state, payload) {
      if (!state.appRoutes.some(appRoute => appRoute.title === payload.title)) {
        state.appRoutes.push({
          id: payload.id,
          title: payload.title,
          city: payload.city
        })
        localStorage.setItem("appRoutes", JSON.stringify(this.state.appRoutes))

        state.pois.push({
          idRoute: payload.idRoute,
          name: payload.name,
          coord: payload.coord
        })
        localStorage.setItem("pois", JSON.stringify(this.state.pois))


        alert("new route");
        //window.history.back();
      } else {
        alert("Route already exists");
      }
    },

    //remove user
    REMOVE_USER(state, payload) {
      state.users = state.users.filter(user => user.id !== payload.id);
      localStorage.setItem("user", JSON.stringify(this.state.users))
    },

    //promote or demote user
    CHANGE_USER_TYPE(state, payload) {
      if (state.users[payload.id].userType === 0) {
        state.users[payload.id].userType = 1
      } else {
        state.users[payload.id].userType = 0
      }
      localStorage.setItem("user", JSON.stringify(this.state.users))
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
    },
    getUserInfo(state) {
      for (const user of state.users) {
        if (user.id === state.id) {
          //testing
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

    },
  }
});