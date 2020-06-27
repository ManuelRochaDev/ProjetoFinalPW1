<template>
  <!--Navbar-->

  <div class="container-fluid">
    <nav id="navbar" class="navbar navbar-expand-lg" :class="{ 'navbar--hidden': !showNavbar }">
      <router-link to="/">
      <a class="navbar-brand">
        Wine
        <span>Route</span>
      </a></router-link>
      <button
        class="navbar-toggler navbar-dark"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse navbar-toggleable-sm" id="navbarTogglerDemo02">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <!-- INÍCIO -->
          <li class="nav-item active" v-if="this.$store.state.currentPath === '/'">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li
            class="nav-item active"
            id="percursos"
            v-if="this.$store.state.currentPath === '/percursos'"
          >
            <router-link to="/percursos" class="nav-link">Percursos</router-link>
          </li>
          <li class="nav-item" id="percursos" v-else>
            <router-link to="/percursos" class="nav-link">Percursos</router-link>
          </li>
          <template v-if="Object.keys(this.$store.state.currentUser).length != 0">
            <!-- <h1>oi {{this.$store.state.currentUser}}</h1> -->
            <li class="nav-item" v-if="this.$store.state.currentUser[0].userType == 0">
              <router-link id="admin" to="/admin" class="nav-link">Admin</router-link>
            </li>
            <li class="nav-item">
              <div class="dropdown">
                <a
                  class="btn btn-secondary"
                  type="button"
                  id="dropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >{{this.$store.state.currentUser[0].name}}</a>
                <!-- class="dropdown-menu" -->
                <ul class="dropdown-menu">
                  <router-link id="user" to="/perfil" class="dropdown-item">Perfil</router-link>
                  <router-link @click.native="logout()" id="user" to="/" class="dropdown-item">Sair</router-link>
                </ul>
              </div>
            </li>
          </template>
          <li class="nav-item" v-if="Object.keys(this.$store.state.currentUser).length === 0">
            <router-link id="logg" to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item" v-if="Object.keys(this.$store.state.currentUser).length === 0">
            <router-link id="reg" to="/registar" class="nav-link">Registar</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  data: () => ({
    showNavbar: true,
    lastScrollPosition: 0
  }),
  created: function() {
    /* if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      )[0];
    } */
    this.$store.state.currentPath = window.location.pathname;
  },

  mounted: function() {
    window.addEventListener("scroll", this.onScroll);
  },

  beforeDestroy() {
    this.logout();
    window.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    logout() {
      this.$store.commit("LOGOUT");
    },

    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    }
  }
};
</script>

<style scoped>
nav {
  margin: 0 auto;
  margin-top: 30px;
  top: 0px;
  left: 12%;
  width: 75%;
  position: fixed;
  background-color: #221d23;
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.5);
  padding: 10px 0px 10px 0px;
  transform: translate3d(0, 0, 0);
  transition: 0.2s all ease-out;
  z-index: 2;
}

nav ul li a {
  margin: 0 auto;
  padding: 4px 20px 4px 20px;
  font-family: "Catamaran", sans-serif;
  font-size: 16px;
  color: white;
  display: inline-block;
}

.navbar-toggler {
  margin-right: 40px;
}

.navbar-brand {
  font-family: "EB Garamond", serif;
  font-size: 24px;
  font-weight: lighter;
  margin-left: 50px;
  color: white;
}

.navbar-brand:hover {
  color: rgb(255, 192, 109);
}

.navbar.navbar--hidden {
  color: none;
  opacity: 0;
  box-shadow: none;
  transform: translate3d(0, -200%, 0);
}

.navbar-expand-lg .navbar-nav .nav-link {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}

a {
  text-decoration: none;
  color: white;
  font-family: "Catamaran", sans-serif;
  font-weight: 200;
}

a:hover {
  color: rgb(255, 192, 109);
  transition: 0.2s linear;
}

span {
  color: rgb(255, 192, 109);
  font-weight: 500;
}

span:hover {
  color: rgb(182, 11, 125);
  transition: 0.2s linear;
}

ul {
  list-style-type: none;
}

#logo {
  width: 40px;
  height: 40px;
}

.container-fluid {
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;
}

#reg {
  color: rgb(255, 192, 109);
}

#reg:hover {
  color: rgb(182, 11, 125);
}

#logg {
  color: rgb(255, 192, 109);
}

#logg:hover {
  color: rgb(182, 11, 125);
}

.dropdown-menu {
  margin: 0 auto;
  text-align: center;
  margin-right: 15%;
  margin-left: 15%;
  background-color: white;
  border-radius: 0%;
  visibility: visible;
}

.dropdown-item {
  color: #221d23;
}

.dropdown-item:hover {
  border: none;
  background-color: #221d23;
}

#dropdown {
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  padding-right: 30px;
  color: white;
}
</style>