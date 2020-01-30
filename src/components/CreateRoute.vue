<template>
  <div id="mainDiv">
    <div class="panel panel-primary table-responsive">
      <div class="panel-heading">
        <h2 class="card-title">Utilizadores</h2>
      </div>
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
                <button type="button" class="btn btn-danger btn-lg" @click="removeUser(user.id)">
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
          </tbody>
        </table>
      </div>
    </div>

    <br />
    <br />

    <div class="panel panel-primary table-responsive">
      <div class="panel-heading">
        <h2 class="card-title">Routes</h2>
      </div>
      <div class="panel-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Título</th>
              <th scope="col">Cidade</th>
            </tr>
          </thead>

          <tbody id="tableValues">
            <tr v-for="appRoute in this.$store.state.appRoutes" :key="appRoute.id">
              <td>{{appRoute.id}}</td>
              <td>{{appRoute.title}}</td>
              <td>{{appRoute.city}}</td>
              <td>
                <button
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

    <br />
    <br />

    <div id="routeDiv">
      <h2 class="card-title">Adicionar Percursos</h2>Título:
      <input type="text" name="title" id="routeTitle" v-model="title" />
      <br />
      <br />Cidade:
      <input type="text" name="city" id="routeCity" v-model="city" />
      <br />
      <br />Dificuldade:
      <select v-model="dif">
        <option value="easy">Fácil</option>
        <option value="medium">Médio</option>
        <option value="hard">Difícil</option>
      </select>
      <br />
      <br />Pontos de interesse:
      <button
        name="addText"
        id="addText"
        class="btn btn-primary"
        href="#"
        role="button"
        @click="addTextbox()"
      >Adicionar novo</button>
      <br />
      <p v-for="(poi, index) in pois" :key="poi.id">
        <input type="text" v-model="poi.name" />
        <input type="button" @click="removeTextbox(index)" value="X" />
        <input type="file" />Escolher audio
      </p>

      <br />
      <br />

      <a
        name="addText"
        id="addText"
        class="btn btn-primary"
        href="#"
        role="button"
        @click="addRoute()"
      >Add Route</a>
      <br />
      <br />

      <div>
        <br />
        <br />
        <div class="google-map" id="myMap"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "createRoute",

  data: () => ({
    id: "",
    title: "",
    city: "",
    dif: "",
    idTextbox: 0,
    users: [{}],
    appRoutes: [],
    newRoute: [{}],
    pois: [],
    idRoute: 0,
    name: "",
    coord: [],
    marker: [],
    lat: [],
    lng: "",
    myPos: null,
    mapPois: [],
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
  },
  mounted: function() {
    this.renderMap();
  },
  methods: {
    //send the new route to the store

    //insert the map on the page
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
    },

    //inserir textbox para pontos de interesse
    addTextbox() {
      this.idTextbox++;
      this.pois.push({ id: this.idTextbox, name: "", lat: "", lng: "" });
    },

    getLastRouteId() {
      return this.$store.getters.getLastRouteId;
    },

    //remover
    removeTextbox(index) {
      this.pois.splice(index, 1);
    },

    //Upgrade ou downgrade user
    changeUsertype(userId) {
      if (confirm("Tem a certeza que quer promover/despromover utilizador?")) {
        this.$store.commit("CHANGE_USER_TYPE", {
          id: userId
        });
      }
    },

    removeUser(userId) {
      if (confirm("Tem a certeza que pretende apagar o utilizador?")) {
        this.$store.commit("REMOVE_USER", {
          id: userId
        });
      }
    },

    removeRoute(routeId) {
      if (confirm("Tem a certeza que pretende apagar a rota?")) {
        this.$store.commit("REMOVE_ROUTE", {
          id: routeId
        });
      }
    },

    blockUser(userId) {
      if (confirm("Tem a certeza que quer blockear/desbloquear utilizador?")) {
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
      let mapPois2 = [];
      let timee = "";
      let distancee = "";
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
        waypoints: this.mapPois.slice(0, -1),
        travelMode: google.maps.DirectionsTravelMode.WALKING,
        optimizeWaypoints: true
      };

      directionsService.route(request, (result, status) => {
        if (status == "OK") {
          directionsRenderer.setDirections(result);
          const directionsData = result.routes[0].legs[0]; // Get data about the mapped route
          if (directionsData) {
            distancee = directionsData.distance.text;
            timee = directionsData.duration.text;
          } else {
            alert("Directions request failed");
          }
        } else {
          alert(status);
        }
        this.time = timee;
        alert(this.time);
        this.distance = distancee;
      });
    },

    addRoute() {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.map);
      const geocoder = new google.maps.Geocoder();
      this.geocodeAddress(geocoder, this.map);
      this.calcRoute(directionsService, directionsRenderer);
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
            
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
          this.$store.state.lat = markerr.getPosition().lat();
            this.$store.state.lng = markerr.getPosition().lng();
            this.$store.commit("ADD_ROUTE", {
              id: Number(this.getLastRouteId()) + 1,
              title: this.title,
              city: this.city,
              dif: this.dif,
              distance: this.$store.state.distance,
              time: this.$store.state.time,

              idRoute: Number(this.getLastRouteId()) + 1,
              name: this.name,
              lat: this.$store.state.lat,
              lng: this.$store.state.lng
            });
        });
      }

      //return
    }
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
</style>
