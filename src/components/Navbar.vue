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
        <li class="nav-item">
          <a class="nav-link" href="#">
            INÍCIO
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#">PERCURSOS</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">SOBRE</a>
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
  created: function() {
    //qd abres esta pagina vai acontecer isto
    if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );
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
    padding-left: 30px;
    padding-right: 30px;
  }

  #nav a:hover { 
   color: rgb(105, 105, 105) 
  }
 
  #nav .navbar-nav li.active > a {
    background-color: #671919;
    color: #fff;
  }
</style>