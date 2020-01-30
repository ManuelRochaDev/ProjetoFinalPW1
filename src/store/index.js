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
      userType: 0,
      picture: "",
      isBlocked: 0
    }],
    appRoutes: [{
      dif: "",
      distance: "",
      time: "",
      id: 0,
      title: "Vinhos pelo Douro",
      city: "Porto",
    }],
    pois: [{
      idRoute: 1,
      lat: 41.352549,
      lng: -8.741763,
      name: "Bacchus Wine Bar",
      audio: "", //aqui seria um link para o áudio
      img: "https://b.zmtcdn.com/data/pictures/8/18859338/2ef0c452a621c193425c98ef7db94ed5_featured_v2.jpg"
    }],
    comments: [{
      id: 0,
      content: "",
      currentUser: 0,
      userName: "",
      date: "",
      //img: ""
    }],
    spotsOfInterest: [],
    currentUser: [], //Se estiver vazio ninguem está logado
    currentRoute: [],
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
      state.currentUser = []
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
          city: payload.city,
          dif: payload.dif,
          time: payload.time,
          distance: payload.distance
        })
        localStorage.setItem("appRoutes", JSON.stringify(this.state.appRoutes))

        state.pois.push({
          idRoute: payload.idRoute,
          name: payload.name,
          lat: payload.lat,
          lng: payload.lng

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
      localStorage.setItem("users", JSON.stringify(this.state.users))
    },

    //remove route
    REMOVE_ROUTE(state, payload) {
      state.appRoutes = state.appRoutes.filter(appRoute => appRoute.id !== payload.id);
      localStorage.setItem("appRoutes", JSON.stringify(this.state.appRoutes))
    },

    //promote or demote user
    CHANGE_USER_TYPE(state, payload) {
      if (state.users[payload.id].userType === 0) {
        state.users[payload.id].userType = 1
      } else {
        state.users[payload.id].userType = 0
      }
      localStorage.setItem("user", JSON.stringify(this.state.users))
    },

    ADD_COMMENT(state, payload) {
      state.comments.push({
        id: payload.id,
        content: payload.content,
        currentUser: payload.currentUser,
        userName: payload.userName,
        date: payload.date
      })
      localStorage.setItem("comments", JSON.stringify(this.state.comments))
    },

    BLOCK_USER(state, payload) {
      if (state.users[payload.id].isBlocked === 0) {
        state.users[payload.id].isBlocked = 1
      } else {
        state.users[payload.id].isBlocked = 0
      }
      localStorage.setItem("user", JSON.stringify(this.state.users))
    },

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
    getLastCommentId(state) {
      if (state.comments.length) {
        return state.comments[state.comments.length - 1].id
      } else {
        return 0
      }
    },
    getComments(state) {
      if (state.comments.length) {
        return state.comments
      }
    }
  }
});