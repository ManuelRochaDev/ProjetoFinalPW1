<template>
  <!--Footer-->
  <footer class="footer" style="background-color: #131313;">
        <div class="container">
          <p class="text-muted">2020 . WINEROUTE . ESMAD</p>
        </div>
      </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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