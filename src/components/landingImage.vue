<template>
  <div>
    <h1>MAPS WITH VUE</h1>
    <button @click="renderMap()">RENDER MAP</button>
    <div class="google-map" id="myMap"></div>
  </div>
</template>

<script>
export default {
  name: "landingImage",
  props: {
    msg: String
  },

  methods: {
    renderMap() {
      this.map = new google.maps.Map(document.querySelector("#myMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });
      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    }
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;;
}
</style>