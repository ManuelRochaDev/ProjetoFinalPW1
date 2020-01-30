import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import About from "../views/About.vue";
import Percursos from "../views/Percursos.vue";
import DetalhesPercurso from "../views/DetalhesPercurso.vue";
import Registar from "../views/Registar.vue";
import Login from "../views/Login.vue";
import Perfil from "../views/Perfil.vue";
//import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: '/registar',
    name: "registar",
    component: Registar,
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {

    path: "/admin",
    name: "admin",
    component: Admin,
    //admin check
    beforeEnter(to, from, next) {
      let loggedUsers = JSON.parse(localStorage.getItem('currentUser'))
      //alert(loggedUsers[0].userType)
      if (loggedUsers != [] || loggedUsers != null) {
        if (loggedUsers[0].userType != 0) {
          next("/");
        } else {
          next();
        }
      }
    }
  },
  {
    path: "/percursos",
    name: "percursos",
    component: Percursos

  },
  {
    path: '/percursos/detalhes',
    component: DetalhesPercurso,
    name: 'DetalhesPercurso'
  },
  {
    path: "/",
    name: "",
    component: Home
  },
  {
    path: "/perfil",
    name: "",
    component: Perfil,
    //check if logged
    beforeEnter(to, from, next) {
      let loggedUsers = JSON.parse(localStorage.getItem('currentUser'))
      if (loggedUsers == [] || loggedUsers == null) {
        next("/");
      } else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
