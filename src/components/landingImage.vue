<template>
  <div>
    <!-- <img src="@/assets/landing.jpg" reverse /> -->
    <div id="“myMap”" style="“width:500px;" height:500px”></div>
  </div>
</template>

<script>
export default {
  name: "landingImage",
  props: {
    msg: String
  }
};

let myMap = document.getElementById("myMap");
function initMap() {
  let mapProp = {
    center: new google.maps.LatLng(37.508742, -0.42085),
    zoom: 5
  };
  let map = new google.maps.Map(myMap, mapProp);
}

initMap()
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