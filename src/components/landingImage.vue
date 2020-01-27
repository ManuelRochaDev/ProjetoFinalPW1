<template>
  <!-- <div>
    <h1>MAPS WITH VUE</h1>
    <div class="google-map" id="myMap"></div>
  </div>-->
  <div id="img" class="row">
    <div class="col-sm-4">
      <h1>WINEROUTE</h1>
      <h6>A APRECIAÇÃO DO VINHO NACIONAL</h6>
    </div>
    <div class="col-sm-8">
      <img class="img-fluid" src="../assets/uvas.png" alt="Uvas" width="600" height="600" />
    </div>
  </div>
</template>

<script>
export default {
  name: "landingImage",
  props: {
    msg: String
  },
  methods: {
    /* renderMap() {
      this.map = new google.maps.Map(document.querySelector("#myMap"), {
        center: { lat: 41.366177, lng: -8.739455 },
        zoom: 18
      });
      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    }, */
  },
  mounted() {
    /* this.renderMap() */
  },
  created: function(){
    this.$store.state.currentPath = window.location.pathname
    alert(this.$store.state.currentPath)
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
}

#img h1 {
  color: #671919;
}

#img h6 {
  color: black;
}
</style>