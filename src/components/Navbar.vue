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
      <ul class="navbar-nav mr-auto">
        <!-- INÍCIO -->
        <li class="nav-item active" v-if="this.$store.state.currentPath === '/'">
          <a class="nav-link">
            <router-link to="/">INÍCIO</router-link>
          </a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link">
            <router-link to="/">INÍCIO</router-link>
          </a>
        </li>
        <!-- PERCURSOS -->
        <li class="nav-item active" v-if="this.$store.state.currentPath === '/percursos'">
          <a class="nav-link">
            <router-link to="/percursos">PERCURSOS</router-link>
          </a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link">
            <router-link to="/percursos">PERCURSOS</router-link>
          </a>
        </li>
        <!--SOBRE -->
        <li class="nav-item active" v-if="this.$store.state.currentPath === '/about'">
          <a class="nav-link">
            <router-link to="/about">SOBRE</router-link>
          </a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link">
            <router-link to="/about">SOBRE</router-link>
          </a>
        </li>
      </ul>
      <form class="navbar-form navbar-left" action="#">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Pesquisar" name="search" />
          <div class="input-group-btn">
            <button class="btn btn-default" type="submit" style="background-color: #ffffff;">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="fa fa-user-circle fa-2x"></i>
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
  data: () => ({
    path: this.$store.state.currentPath
  }),
  created: function() {
    //qd abres esta pagina vai acontecer isto
    if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );
    }
    this.$store.state.currentPath = window.location.pathname
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
  padding-left: 30px;
  padding-right: 30px;
}

#nav a:hover {
  color: rgb(105, 105, 105);
}

#nav .navbar-nav li.active > a {
  background-color: #671919;
  color: #fff;
}
</style>