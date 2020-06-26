import Vue from "vue";
import Vuex from "vuex";
import swal from "sweetalert";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);
/* Vue.use(router) */

export default new Vuex.Store({

  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],

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
    routeCategory: "",
    APIUsers: [],
    APICategories: [],
    APIAppRoutes: [],
    APILoginData: [],
    APIPois: [],
    APIComments: [],
    API_ADDRESS: "127.0.0.1:3000"
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
          userType: payload.userType,
          isBlocked: payload.isBlocked,
          img: payload.img
        })
        localStorage.setItem("users", JSON.stringify(this.state.users))
        //window.history.back();
        swal("Registo", "Foste registado com sucesso", "success")
      } else {
        swal("Erro", "O utilizador já existe", "error");
      }
    },

    SET_CURRENT_USER(state, payload) {
      let id = payload.id
      for (const route of state.APIAppRoutes) {
        if (route.id_route == id) {
          state.currentRoute.push({
            id_route: route.id_route,
            difficulty: route.difficulty,
            distance: route.distance,
            time: route.time,
            title: route.title,
            city: route.city,
            id_category: route.id_category,
            id_user: route.id_user,
            description: route.description,
            routePois: route.routePois,
            audiolink: route.audiolink
          });
        }
      }
    },

    LOGIN(state, payload) {
      /* commit("LOGIN", await users.login()) */

      for (const user of state.APIUsers) {
        if (user.email === payload.email) {
          state.currentUser = []
          state.currentUser.push({
            id_user: user.id_user,
            name: user.name,
            lastName: user.lastName,
            email: payload.email,
            userType: user.userType,
            avatar: user.avatar
          })
        }
      }
      /* alert(state.currentUser[0].userType) */


      /* axios
        .post('http://' + state.API_ADDRESS + '/login/', {
          email: this.emailLogin,
          password: this.passwordLogin,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => { */
      /* let APILoginData = response; */

      /* alert(response) */
      /* commit('LOGIN', APILoginData) */
      /* })
      .catch(function (error) {
        alert(error)
      })
      .finally(() => this.loading = false) */


      /* swal("Login", "Utilizador autenticado", "success") */

      /* if (state.currentUser.userType === 0) {
        window.location.href = "../admin"
      } else if (state.currentUser.userType === 1) {
        window.location.href = "../"
      } */
      /* 
            localStorage.setItem("currentUser", JSON.stringify(this.state.currentUser))
          swal("Login", "Utilizador autenticado", "success")
     
     
          /* state.credCorrect = true */
      /* if (state.currentUser.userType === 0) {
    window.location.href = "../admin"
    } else if (state.currentUser.userType === 1) {
    window.location.href = "../"
    } */
      /* } else {
        swal("Erro", "Credenciais incorretas", "warning")
      } */
      /*     } */
    },

    LOGOUT(state) {
      state.currentUser = [];
      /* localStorage.removeItem("currentUser", JSON.stringify(this.state.currentUser)); */
      swal("Sair", "Até à próxima!", "success");
      /* window.location.href = ".." */
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
      let routeUpd = []
      let newRoute = []
      for (let i = 0; i < Object.keys(state.appRoutes).length; i++) {

        if (state.appRoutes[i].id == payload.id) {
          //tanto o id da rota a mudar como o total de rotas são bem lidos
          routeUpd[i].title = payload.newTitle
          routeUpd[i].city = payload.newCity
          routeUpd[i].dif = payload.newDif
          routeUpd[i].routePois = payload.newRoutePois
          routeUpd[i].desc = payload.newDesc
        } else {
          routeUpd[i] = state.appRoutes[i]
        }
        newRoute.push(routeUpd[i])
      }

      localStorage.setItem("appRoutes", JSON.stringify(newRoute))
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
      swal("Deseja proceder?", "Depois de confirmar não pode recuperar o utilizador", "warning", "true")
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
      //deve funcionar com a api
      alert(payload.id)
      if (state.users[payload.id].userType === 0) {
        state.users[payload.id].userType = 1
      } else {
        state.users[payload.id].userType = 0
      }
      localStorage.setItem("users", JSON.stringify(this.state.users))
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
      /* localStorage.setItem("comments", JSON.stringify(this.state.comments)) */
    },

    BLOCK_USER(state, payload) {
      if (state.users[payload.id].isBlocked === 0) {
        state.users[payload.id].isBlocked = 1
      } else {
        state.users[payload.id].isBlocked = 0
      }
      localStorage.setItem("users", JSON.stringify(this.state.users))
    },

    SET_USERS(state, payload) {
      state.APIUsers = payload
    },
    SET_CATEGORIES(state, payload) {
      state.APICategories = payload
    },
    SET_ROUTES(state, payload) {
      state.APIAppRoutes = payload
    },
    SET_POIS(state, payload) {
      state.APIPois = payload
    },
    SET_COMMENTS(state, payload) {
      state.APIComments = payload
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
      if (state.APIAppRoutes.length) {
        return state.APIAppRoutes[state.APIAppRoutes.length - 1].id
      } else {
        return 0
      }
    },
    getNumberOfRoutes(state) {
      if (state.appRoutes.length) {
        return state.appRoutes.length
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
  },
  actions: {
    getUsers({ commit, state }) {
      axios
        .get('http://' + state.API_ADDRESS + '/users/', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          //localStorage.setItem("TESTusers", JSON.stringify(response.data))
          let users = response.data;
          commit('SET_USERS', users)
          //alert(users)
        })
        .catch(function (error) {
          /* this.errored = true */
          /* console.log(error) */
          alert(error)
        })
        .finally(() => this.loading = false)

    },
    getCategories({ commit, state }) {
      axios
        .get('http://' + state.API_ADDRESS + '/categories/', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          let categories = response.data;
          commit('SET_CATEGORIES', categories)
        })
        .catch(function (error) {
          alert(error)
        })
        .finally(() => this.loading = false)

    },
    getAppRoutes({ commit, state }) {
      axios
        .get('http://' + state.API_ADDRESS + '/routes/', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          let routes = response.data;
          commit('SET_ROUTES', routes)
        })
        .catch(function (error) {
          alert(error)
        })
        .finally(() => this.loading = false)

    },
    getPois({ commit, state }) {
      axios
        .get('http://' + state.API_ADDRESS + '/pois/', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          let pois = response.data;
          commit('SET_POIS', pois)
        })
        .catch(function (error) {
          alert(error)
        })
        .finally(() => this.loading = false)
    },
    getComments({ commit, state }) {
      axios
        .get('http://' + state.API_ADDRESS + '/comments/', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          let comments = response.data;
          commit('SET_COMMENTS', comments)
        })
        .catch(function (error) {
          alert(error)
        })
        .finally(() => this.loading = false)
    },
  },
});