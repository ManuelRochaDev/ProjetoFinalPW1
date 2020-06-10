<template>
  <!--Navbar-->
  <header>
    <div class="container-fluid">
      <nav id="navbar" class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="#">
          Wine
          <span>Route</span>
        </a>
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
          <!-- mostrar página atual a vermelho -->
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <!-- INÍCIO -->
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <!-- PERCURSOS -->
            <li class="nav-item" id="percursos">
              <router-link to="/percursos" class="nav-link">Percursos</router-link>
            </li>
            <li class="nav-item">
              <router-link id="logg" to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link id="reg" to="/registar" class="nav-link">Registar</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  data: () => ({}),
  created: function() {
    if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      )[0];
    }
    this.$store.state.currentPath = window.location.pathname;
  },

  methods: {
    logout() {
      this.$store.commit("LOGOUT", {
        email: this.emailLogin
      });
    },
    callScroll() {
      window.onscroll = this.scrollFunction();
    }
  }
};
</script>


<style scoped>
header {
  width: 80%;
  position: absolute;
  top: 4%;
  left: 50%;
  transform: translate(-50%, -50%);
}

nav {
  margin: 0 auto;
  top: 25px;
  left: 5%;
  width: 90%;
  position: absolute;
  background-color: #221d23;
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.5);
  padding: 10px 0px 10px 0px;
}

nav ul li a {
  padding: 0px 20px 0px 20px;
  font-family: "Catamaran", sans-serif;
  font-size: 16px;
  color: white;
  margin-right: 30px;
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
</style>