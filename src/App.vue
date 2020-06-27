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
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.swal2-popup {
  font-size: 1.6rem !important;
}

/* .swal-icon {
  width: 5em !important;
  height: 5em !important;
  border-width: .25em !important;
} */

#nav {
  margin: 0 auto;
  justify-content: center;
}

body {
  font-size: 16px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
}

p,
h4,
td,
th {
  font-family: "Catamaran", sans-serif;
}

h1,
h2 {
  font-family: "EB Garamond", serif;
}
</style>
