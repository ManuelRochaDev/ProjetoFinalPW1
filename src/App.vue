<template>
  <div id="app">
    <div id="nav">
      <Navbar></Navbar>
      <router-link to="/"></router-link>
    </div>
    <router-view />
    <div id="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  components: {
    Navbar,
    Footer
  },
};
</script>

<style>
#app {
  font-family: 'Assistant', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a:hover {
  color: rgb(105, 105, 105);
}

#nav .navbar-nav li.active > a {
  background-color: #671919;
  color: #fff;
}
</style>
