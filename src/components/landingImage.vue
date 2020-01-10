<template>
  <div>
    <!-- <img src="@/assets/landing.jpg" reverse /> -->
<!--     <button @click="initMap()">RENDER MAP</button>
    <div id="map" class="google-map"></div> -->
  </div>
</template>

<script>
export default {
  name: "landingImage",
  props: {
    msg: String
  }
};

/* function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.397, lng: 150.664 },
    zoom: 5
  }); 
}*/


</script>

<script>
async;
src =
  "hhtps://maps.googleapis.com/maps/api/js?key=AIzaSyCia3pZ2qUX8TMQq1FUDmBL7D1NJEsOlms&callback=initMap";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>