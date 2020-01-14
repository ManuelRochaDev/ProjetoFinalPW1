<template>
  <div>
    <h1>MAPS WITH VUE</h1>
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
        center: { lat: 41.366177, lng: -8.739455 },
        zoom: 18
      });
      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    },
  },
  mounted(){
    this.renderMap()
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