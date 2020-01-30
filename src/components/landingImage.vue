<template>
  <div>
    <div id="img" class="row">
      <div class="col-sm-4">
        <h1>WINEROUTE</h1>
        <h6>A APRECIAÇÃO DO VINHO NACIONAL</h6>
      </div>
      <div class="col-sm-8">
        <img class="img-fluid" src="../assets/uvas.png" alt="Uvas" width="600" height="600" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "landingImage",
  props: {
    msg: String
  },

  created: function(){
    this.$store.state.currentPath = window.location.pathname
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#img h1 {
  color: #671919;
}

#img h6 {
  color: black;
}
</style>