<template>
  <div id="mainDiv">
    <div class="panel-group" id="userTable">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h2 class="card-title">Utilizadores</h2>
          <br />
        </div>
        <div id = "tabelUser" class="container">
          <div class="panel-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Apelido</th>
                  <th scope="col">Tipo de utilizador</th>
                  <th scope="col">Estado</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>

              <tbody id="tableValues">
                <tr v-for="user in this.$store.state.users" :key="user.id">
                  <td>{{user.id}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.name}}</td>
                  <td>{{user.lastName}}</td>
                  <td>{{user.userType}}</td>
                  <td>{{user.isBlocked}}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-lg"
                      @click="removeUser(user.id)"
                    >
                      <span class="glyphicon glyphicon-remove"></span>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary btn-lg"
                      @click="changeUsertype(user.id)"
                    >
                      <span class="glyphicon glyphicon-resize-vertical"></span>
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-secondary btn-lg">
                      <span class="glyphicon glyphicon-lock"></span>
                    </button>
                  </td>
                </tr>
                <!--<tr>
              <th>No existing users</th>
                </tr>-->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-group" id="routeTable">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h2 class="card-title">Routes</h2>
        </div>
        <div class="container">
          <div class="panel-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Título</th>
                  <th scope="col">Cidade</th>
                  <th scope="col"></th>
                </tr>
              </thead>

              <tbody id="tableValues">
                <tr v-for="appRoute in this.$store.state.appRoutes" :key="appRoute.id">
                  <td>{{appRoute.id}}</td>
                  <td>{{appRoute.title}}</td>
                  <td>{{appRoute.city}}</td>
                  <td>
                    <button
                      v-if="appRoute.id !== 0"
                      type="button"
                      class="btn btn-danger btn-lg"
                      @click="removeRoute(appRoute.id)"
                    >
                      <span class="glyphicon glyphicon-remove"></span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>

    <br />
    <br />

    <div id="routeDiv">
      <div class="panel panel-default">
        <div class="panel-body">
          <h2 class="card-title">Adicionar Percursos</h2>
          <br />
          <label for="idRouteTitle">Título:</label>
          <input type="text" name="title" id="routeTitle" v-model="title" />
          <br />
          <br />
          <label for="idRouteTitle">Cidade:</label>
          <input type="text" name="city" id="routeCity" v-model="city" />

          <br />
          <br />Pontos de interesse:
          <button
            name="addText"
            id="addText"
            class="btn btn-dark btn-lg"
            href="#"
            role="button"
            @click="addTextbox()"
          >Adicionar novo</button>
          <br />
          <p v-for="(poi, index) in pois" :key="poi.id">
            <input type="text" v-model="poi.name" />
            <input type="button" @click="removeTextbox(index)" value="X" />
          </p>

          <br />
          <input
            type="button"
            class="btn btn-danger btn-lg"
            value="Delete"
            @click="deleteMarkers()"
          />
          <input
            type="button"
            class="btn btn-dark btn-lg"
            id="btnGeocode"
            value="Gerar pontos no mapa"
          />
          <br />
          <br />

          <a
            name="addText"
            id="addText"
            class="btn btn-success btn-lg"
            href="#"
            role="button"
            @click="addRoute()"
          >Add Route</a>
          <br />
          <br />
        </div>
      </div>

      <div id="mapDiv">
        <h2>MAPA</h2>
        <!-- <button @click="renderMap()">RENDER MAP</button> -->
        <br />
        <div class="google-map" id="myMap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "createRoute",

  data: () => ({
    id: "",
    title: "",
    city: "",
    idTextbox: 0,
    users: [{}],
    appRoutes: [],
    newRoute: [{}],
    pois: [],
    idRoute: 0,
    name: "",
    coord: [],
    marker: [],
    lat: 0,
    lng: 0,
    myPos: null,
    mapPois: [],
    esmad: [],
    mapPoisTest: []
  }),

  created: function() {
    //load users when page is opened

    if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    }

    if (localStorage.getItem("pois")) {
      this.$store.state.pois = JSON.parse(localStorage.getItem("pois"));
    }

    if (localStorage.getItem("appRoutes")) {
      this.$store.state.appRoutes = JSON.parse(
        localStorage.getItem("appRoutes")
      );
    }
    //ESTAVA AQUI!!!!!!!!!!!!!!!!!!!!!!!!!!
    /* 
    for (let i = 0; i < this.$store.state.pois; i++) {
      this.mapPois[i] = {
        lat: this.$store.state.pois[i].lat,
        lng: this.$store.state.pois[i].lng
      };
    } */
    /* mapPois((contact) => {
   this.mapPois.push({
        lat: this.$store.state.pois[i].lat,
        lng: this.$store.state.pois[i].lng
      }); 
});*/
  },
  mounted: function() {
    this.renderMap();
  },
  methods: {
    //send the new route to the store
    addRoute() {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.map);
      this.calcRoute(directionsService, directionsRenderer);
      this.$store.commit("ADD_ROUTE", {
        id: Number(this.getLastRouteId()) + 1,
        title: this.title,
        city: this.city,

        idRoute: Number(this.getLastRouteId()) + 1,
        name: this.name,
        lat: this.lat,
        lng: this.lng
      });
      //renderMap();
    },

    renderMap() {
      this.map = new google.maps.Map(document.querySelector("#myMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });

      var contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";

      let infoWindow = new google.maps.InfoWindow({
        content: contentString
      });

      // Try to get HTML5 geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.myPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(this.myPos);
            infoWindow.setContent("You are here");
            infoWindow.open(this.map);

            this.map.setCenter(this.myPos);
          },
          () => this.handleLocationError(true, infoWindow, this.map.getCenter())
        );
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, this.infoWindow, this.map.getCenter());
      }

      const geocoder = new google.maps.Geocoder();

      document
        .querySelector("#btnGeocode")
        .addEventListener("click", () =>
          this.geocodeAddress(geocoder, this.map)
        );
    },

    //Insert a new textbox for the user to insert an interestPoint
    addTextbox() {
      this.idTextbox++;
      this.pois.push({ id: this.idTextbox, name: "", lat: "", lng: "" });
    },

    getLastRouteId() {
      return this.$store.getters.getLastRouteId;
    },

    //remove the Box
    removeTextbox(index) {
      this.pois.splice(index, 1);
    },

    //Upgrade or downgrade user
    changeUsertype(userId) {
      if (confirm("Tem a certeza que quer promover/despromover utilizador?")) {
        swal("Utilizador alterado com successo", {
          icon: "success"
        });
        this.$store.commit("CHANGE_USER_TYPE", {
          id: userId
        });
      }
    },

    removeUser(userId) {
      if (confirm("Tem a certeza que pretende apagar o utilizador?")) {
        swal("Utilizador removido com successo", {
          icon: "success"
        });
        this.$store.commit("REMOVE_USER", {
          id: userId
        });
      }
    },

    removeRoute(routeId) {
      if (confirm("Tem a certeza que quer remover esta rota?")) {
        swal("Ficheiro removido com successo", {
          icon: "success"
        });
        this.$store.commit("REMOVE_ROUTE", {
          id: routeId
        });
      }
    },

    blockUser(userId) {
      if (confirm("Tem a certeza que quer blockear/desbloquear utilizador?")) {
        swal("Utilizador alterado com successo", {
          icon: "success"
        });
        this.$store.commit("BLOCK_USER", {
          id: userId
        });
      }
    },

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(this.map);
    },

    calcRoute: function(directionsService, directionsRenderer) {
      //alert(this.$store.state.pois[10].lng);
      this.esmad = { lat: 41.366949, lng: -8.738722 };
      let mapPois2 = [];
      this.$store.state.pois.forEach(function(poi) {
        mapPois2.push({
          location: new google.maps.LatLng(poi.lat, poi.lng),
          stopover: true
        });
      });
      this.mapPois = mapPois2;

      // Creation of a DirectionsRequest object
      const request = {
        origin: this.myPos,
        destination: this.mapPois[this.mapPois.length - 1].location,
        waypoints: this.mapPois,
        travelMode: google.maps.DirectionsTravelMode.WALKING,
        optimizeWaypoints: true
      };

      directionsService.route(request, (result, status) => {
        if (status == "OK") {
          directionsRenderer.setDirections(result);
          const directionsData = result.routes[0].legs[0]; // Get data about the mapped route
          if (directionsData) {
            /* alert(
              "Driving distance is" +
                directionsData.distance.text +
                directionsData.duration.text
            ); */
          } else {
            alert("Directions request failed");
          }
        } else {
          alert(status);
        }
      });
    },
    //blockUser(){}

    convertArrayToObject(array, key) {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item
        };
      }, initialValue);
    },
    arrayToObject(arr) {
      var obj = {};
      for (var i = 0; i < arr.length; ++i) {
        obj[i] = arr[i];
      }
      return obj;
    },

    deleteMarkers() {
      //Loop through all the markers and remove
      for (var i = 0; i < this.marker.length; i++) {
        this.marker[i].setMap(null);
      }
      this.marker = [];
    },

    geocodeAddress(geocoder, resultsMap) {
      let markerr = [];
      let address = [];
      for (let i = 0; i < this.pois.length; i++) {
        address[i] = this.pois[i].name;

        geocoder.geocode({ address: address[i] }, (results, status) => {
          if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);

            markerr = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            markerr.setMap(resultsMap);
            this.coord = markerr;
            this.marker = markerr;
            this.lat = markerr.getPosition().lat();
            this.lng = markerr.getPosition().lng();
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      }
    }
    //insert the map on the page
  }
};
</script>

<style scoped type="text/css">
@import url("//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css");

.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

#routeTable {
  padding-top: 8%;
}
#mapDiv {
  padding-top: 4%;
}

.container{
  padding-right: 10%
}

</style>
