<template>
  <div id="routeDiv">
    <h2 class="card-title" align="left">Adicionar Percursos</h2>Título:
    <input type="text" name="title" id="routeTitle" />
    <br />
    <br />Cidade:
    <input type="text" name="city" id="routeCity" />

    <br />
    <br />Pontos de interesse:
    <button
      name="addText"
      id="addText"
      role="button"
      @click="addTextbox()"
    >Adicionar novo</button>
    <br />
    <p v-for="poi in pois" :key="poi.id">
      <input type="text" v-model="poi.name" />
    </p>
    <pre>
      {{this.pois}}
    </pre>

    <a
      name="addText"
      id="addText"
      class="btn btn-primary"
      href="#"
      role="button"
      @click="addRoute"
    >Add Route</a>
    <br />
    <br />

    <h1>MAPS WITH VUE</h1>
    <button @click="renderMap()">RENDER MAP</button>
    <div class="google-map" id="myMap">
      <p id="error"></p>
    </div>

    <input id="btnGeocode" type="button" value="Geocode" />
  </div>
</template>

<script>
export default {
  name: "createRoute",

    data: () => ({
    pois: [],
    idTextbox: 0,
  }),

  methods: {
    addRoute() {
      this.$store.commit("ADD_ROUTE", {
        id: this.$store.getters.getLastRouteId + 1,
        title: this.title,
        city:this.city,
        pois: this.pois
      });
    },

    addTextbox() {
      this.idTextbox++
      this.pois.push({id: this.idTextbox, name: ""})
    },

    /**
     * Enter the map and pass the address to the map
     */
    geocodeAddress(geocoder, resultsMap) {
    let newRoute = {
      id: "",
      title: this.title,
      pois: []
    }


      let addresses =  []
      for(let i = 0; i< this.pois.length; i++){
         addresses[i] = this.pois[i].value
      }
      geocoder.geocode({'addresses': addresses },
        (results, status) => {
          for (let i = 0; i < addresses.length; i++) {
            if (status === "OK") {
              resultsMap.setCenter(results[0].geometry.location);

              newRoute.interestPoints.push({
                id:0,
                lat: results[0].geometry.location.lat,
  	            lng: results[0].geometry.location.lng
              })

              const marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
              });
                marker.setMap(resultsMap)
            } else {
              alert(
                "Geocode was not successful for the following reason: " + status
              );
            }
          }
        },
      this.commit('ADD_ROUTE',newRoute)

      );
    },


    renderMap() {
      this.map = new google.maps.Map(document.querySelector("#myMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });
      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
      const geocoder = new google.maps.Geocoder();

      document.querySelector('#btnGeocode').addEventListener('click',() => this.geocodeAddress(geocoder,this.map))
    }
    
  }
};
</script>

<style scoped type="text/css">
#map {
  width: 500px;
  height: 500px;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
