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
            </tr>
          </thead>

          <tbody id="tableValues">
            <tr v-for="user in this.$store.state.users" :key="user.id">
              <td>{{user.id}}</td>
              <td>{{user.email}}</td>
              <td>{{user.name}}</td>
              <td>{{user.lastName}}</td>
              <td>{{user.userType}}</td>
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
            <!--<tr>
              <th>No existing users</th>
            </tr>-->
          </tbody>
        </table>
      </div>
    </div>

    <br />
    <br />

    <div id="routeDiv">
      <h2 class="card-title">Adicionar Percursos</h2>Título:
      <input type="text" name="title" id="routeTitle" v-model="newRoute.title" />
      <br />
      <br />Cidade:
      <input type="text" name="city" id="routeCity" v-model="newRoute.city" />

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
        <input type="button" v-model="poi.remove" @click="removeTextbox(index)" />
        <input type="file" />Escolher audio
      </p>
      <pre>
      {{this.newRoute}}
    </pre>

    
      <input type="button" id="btnGeocode" value="Geocode" />
      <br><br>

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
        <h1>MAPS WITH VUE</h1>
        <button @click="renderMap()">RENDER MAP</button>
        <br />
        <br />
        <div class="google-map" id="myMap"></div>
      </div>

      <!--<input id="btnGeocode" type="button" value="Geocode" />-->
    </div>
  </div>
</template>

<script>
export default {
  name: "createRoute",

  data: () => ({
    idTextbox: 0,
    users: [{}],
    newRoute: [{}],
    pois: []
  }),

  created: function() {
    //load users when page is opened
    if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    }
  },

  methods: {
    //send the new route to the store
    addRoute() {
      this.$store.commit("ADD_ROUTE", {
        id: Number(this.$store.getters.getLastRouteId) + 1,
        title: this.newRoute.title,
        city: this.newRoute.city,
        //map: this.map

        idRoute: this.pois.idRoute,
        name: this.pois.name,
        lat: this.pois.lat,
        lng: this.pois.lng
      });
    },
    //storeRoute() {},

    //Insert a new textbox for the user to insert an interestPoint
    addTextbox() {
      this.idTextbox++;
      this.pois.push({ id: this.idTextbox, name: "", remove: "X" });
    },

    //remove the Box
    removeTextbox(index) {
      this.pois.splice(index, 1);
    },

    //Upgrade or downgrade user
    changeUsertype(userId) {
      if (confirm("Tem a certeza que quer promover/despromover utilizador?")) {
        this.$store.commit("CHANGE_USER_TYPE", {
          id: userId
        });
      }
    },

    removeUser(bruh) {
      if (confirm("Tem a certeza que pretende apagar o utilizador?")) {
        this.$store.commit("REMOVE_USER", {
          id: bruh
        });
      }
    },

    //blockUser(){}

    geocodeAddress(geocoder, resultsMap) {
      alert("yuifyuofuyof")
      let addresses = []
      for (let i = 0; i < this.pois.length; i++) {
        addresses[i] = this.pois[i].name
      }
      geocoder.geocode({ addresses: addresses }, (results, status) => {
        for (let i = 0; i < addresses.length; i++) {
          if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);

            alert("ibv8ygvygv")
            this.pois.push({
              idRoute: 0,
              lat: results[0].geometry.location.lat,
              lng: results[0].geometry.location.lng
            });

            const marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            marker.setMap(resultsMap);
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      });
    },

    //insert the map on the page
    renderMap() {
      this.map = new google.maps.Map(document.querySelector("#myMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });

      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
      const geocoder = new google.maps.Geocoder();

    document.querySelector("#btnGeocode").addEventListener("click", () =>
          this.geocodeAddress(geocoder, this.map),
    )
    },

    mounted() {
      this.renderMap();
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
