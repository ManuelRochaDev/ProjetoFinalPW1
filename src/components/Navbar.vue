<template>
  <!--Navbar-->
  <nav class="navbar navbar-expand-lg navbar-light" style="color:#FFFDED">
    <button
      aria-expanded="false"
      aria-controls="nav-drawer"
      type="button"
      class="btn nav-link float-sm-left mr-1 btn-secondary"
      data-action="toggle-drawer"
      data-side="left"
      data-preference="drawer-open-nav"
    >
      <i class="icon fa fa-bars fa-fw" aria-hidden="true"></i>
      <span class="sr-only">Painel lateral</span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="nav navbar-nav">
        <li class="nav-item dropdown">
          <i class="glyphicon glyphicon-menu-hamburger"></i>
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>

        <li class="nav-item active">
          <a class="nav-link" href="#">INÍCIO</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">PERCURSOS</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">SOBRE</a>
        </li>
      </ul>

      <ul class="nav navbar-nav navbar-right">
        <li>
          <div class="btn-nav">
            <img src="@/assets/search.png" class="srcIcon" />
          </div>
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-default {
  background-color: #fffded;
}

.navbar-nav > li {
  padding-left: 45px;
  padding-right: 45px;
}

.srcIcon {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 12%;
}
</style>