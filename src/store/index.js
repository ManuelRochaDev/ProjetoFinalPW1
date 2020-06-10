import Vue from "vue";
import Vuex from "vuex";
import swal from "sweetalert";

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
      title: "Percurso em Vila do Conde",
      city: "Vila do Conde",
    }],
    pois: [{
      idRoute: 0,
      lat: 41.352549,
      lng: -8.741763,
      name: "Bacchus Wine Bar",
      audio: "", //aqui seria um link para o áudio
      img: "https://b.zmtcdn.com/data/pictures/8/18859338/2ef0c452a621c193425c98ef7db94ed5_featured_v2.jpg"
    },
    {
      idRoute: 0,
      lat: 41.352044,
      lng: -8.741484,
      name: "Encanas Bar",
      audio: "", //aqui seria um link para o áudio
      img: ""
    },
    {
      idRoute: 0,
      lat: 41.353645,
      lng: -8.742915,
      name: "Barcearia 1º Piso",
      audio: "", //aqui seria um link para o áudio
      img: ""
    },
    ],
    comments: [{

    }],
    spotsOfInterest: [],
    currentUser: [], //Se estiver vazio ninguem está logado
    currentRoute: [],
    credCorrect: false,
    currentPath: "/percursos",
    lat: 0,
    lng: 0,
    time: "",
    distance: "",
    desc: "",
    categories: [],
    routeCategory: ""
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
        //window.history.back();
        swal("Registo", "Foste registado com sucesso", "success")
      } else {
        swal("Erro", "O utilizador já existe", "error");
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
            swal("Log-in", "Utilizador logado", "success")
          localStorage.setItem("currentUser", JSON.stringify(this.state.currentUser))

          state.credCorrect = true
          if (user.userType === 0) {
            window.location.href = "../admin"
          } else if (user.userType === 1) {
            window.location.href = "../"
          }
        } else {
          state.credCorrect = false;
          swal("Erro", "Credenciais incorretas", "warning")
        }
      }
    },

    LOGOUT(state) {
      state.currentUser = [];
      localStorage.removeItem("currentUser", JSON.stringify(this.state.currentUser));
      swal("Utilizador saiu")
      window.location.href = ".."
    },

    ADD_ROUTE(state, payload) {
      state.appRoutes.push({
        id: payload.id,
        title: payload.title,
        city: payload.city,
        dif: payload.dif,
        category: payload.routeCategory,
        /* time: payload.time,
        distance: payload.distance, */
        routePois: payload.routePois,
        desc: payload.desc,
        audiolink: payload.audiolink
      })
      localStorage.setItem("appRoutes", JSON.stringify(this.state.appRoutes))

      swal("Nova Rota", "Rota registada com sucesso", "success")

      /* } else {
        swal("Erro", "Rota já existe", "error");
      } */
    },

    EDIT_ROUTE(state, payload) {
      let routeUpd = {}
      for (let i = 0; i < state.appRoutes.length; i++) {
        if (state.appRoutes[i].id == state.appRoutes[payload.id].id) {
          routeUpd[i].title = payload.newTitle
          routeUpd[i].city = payload.newCity
          routeUpd[i].dif = payload.newDif
          routeUpd[i].routePois = payload.newRoutePois
          routeUpd[i].routeCategory = payload.newRouteCategory
          routeUpd[i].desc = payload.newDesc
        } else {
          routeUpd[i] = state.appRoutes[i]
        }
        localStorage.setItem("appRoutes", JSON.stringify(routeUpd))
      }

      swal("Edição", "Rota editada com sucesso", "success")
    },

    ADD_POI(state, payload) {

      state.pois.push({
        idRoute: payload.idRoute,
        name: payload.name,
        lat: payload.lat,
        lng: payload.lng

      })
      localStorage.setItem("pois", JSON.stringify(this.state.pois))
    },

    ADD_CATEGORY(state, payload) {

      state.categories.push({
        name: payload.name
      })
      localStorage.setItem("categories", JSON.stringify(this.state.categories))

      swal("Nova Categoria", "Categoria adicionada", "success")
    },

    //remove user
    REMOVE_USER(state, payload) {
      state.users = state.users.filter(user => user.id !== payload.id);
      localStorage.setItem("users", JSON.stringify(this.state.users))
      swal("Deseja proceder?", "Depois de remover o ficheiro não pode recuperar o utilizador", "warning", "true")
        .then((willDelete) => {
          if (willDelete) {
            swal("Ficheiro removido com successo", {
              icon: "success",
            });
          }
        });
    },

    //remove route
    REMOVE_ROUTE(state, payload) {
      state.appRoutes = state.appRoutes.filter(appRoute => appRoute.id !== payload.id);
      localStorage.setItem("appRoutes", JSON.stringify(this.state.appRoutes))
      swal("Deseja proceder?", "Depois de remover o ficheiro não pode recuperar a rota", "warning", "true")
        .then((willDelete) => {
          if (willDelete) {
            swal("Ficheiro removido com successo", {
              icon: "success",
            });
          }
        });
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

    CHANGE_USER(state, payload) {
      let usersUpd = {}
      for (let i = 0; i < state.users.length; i++) {

        if (state.users[i].id == state.users[payload.id].id) {
          usersUpd[i].name = payload.newFirstName
          usersUpd[i].lastName = payload.newLastName
          usersUpd[i].email = payload.newEmail
          usersUpd[i].password = payload.newPassword

        } else {
          usersUpd[i] = state.users[i]
        }
        localStorage.setItem("users", JSON.stringify(usersUpd))
      }
    },

    ADD_COMMENT(state, payload) {
      state.comments.push({
        id: payload.id,
        content: payload.content,
        currentUser: payload.currentUser,
        userName: payload.userName,
        date: payload.date,
        id_route: payload.id_route
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

    getLastCategoryId(state) {
      if (state.categories.length) {
        return state.categories[state.categories.length - 1].id
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