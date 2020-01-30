<template>
  <!--Navbar-->
  <nav class="navbar navbar-light navbar-expand-lg">
    <!--<a class="navbar-brand" href="#">WINEROUTE</a>-->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <!-- mostrar página atual a vermelho -->
      <ul class="navbar-nav mr-auto">
        <!-- INÍCIO -->
        <li class="nav-item active" v-if="this.$store.state.currentPath === '/'">
          <router-link to="/" class="nav-link">INÍCIO</router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/" class="nav-link">INÍCIO</router-link>
        </li>
        <!-- PERCURSOS -->
        <li class="nav-item active" v-if="this.$store.state.currentPath === '/percursos'">
          <router-link to="/percursos" class="nav-link">PERCURSOS</router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/percursos" class="nav-link">PERCURSOS</router-link>
        </li>
        <!--SOBRE -->
        <li class="nav-item active" v-if="this.$store.state.currentPath === '/about'">
          <router-link to="/about" class="nav-link">SOBRE</router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/about" class="nav-link">SOBRE</router-link>
        </li>
      </ul>
      <!-- fim -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <form v-on:submit.prevent="logout()">
            <div class="col-sm-6" v-if="this.$store.state.currentUser != ''">
              <button class="btn btn-lg" type="submit" id="logout-btn" squared>Logout</button>
            </div>
            <div class="col-sm-6" v-else>
              <button class="btn btn-lg" type="submit" id="logout-btn"  hidden squared>Logout</button>
            </div>
          </form>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <form>
            <div class="col-sm-6" v-if="this.$store.state.currentUser.userType === 0">
              <button class="btn btn-lg" type="submit" id="admin-btn" squared>Admin</button>
            </div>
          </form>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="fa fa-user-circle fa-3x"></i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  data: () => ({}),
  created: function() {
    //qd abres esta pagina vai acontecer isto
    if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")[0]
      );
    }
    this.$store.state.currentPath = window.location.pathname;
  },

  methods: {
    logout() {
      this.$store.commit("LOGOUT", {
        email: this.emailLogin
      });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
  padding-bottom: 20px;
}

#nav a {
  font-weight: bold;
  color: #671919;
  padding-left: 40px;
  padding-right: 40px;
}

#navbarTogglerDemo02 {
  margin-right: 8%;
  margin-left: 8%;
}

#nav a:hover {
  color: rgb(105, 105, 105);
}

#nav .navbar-nav li.active > a {
  background-color: #671919;
  color: #fff;
}

#logout-btn{
background-color:#671919;
color: white
}

#admin-btn{
background-color:#671919;
color: white
}

</style>