<template>
  <div id="mainDiv">
    <div class="container-fluid">
      <div class="accordion" id="accordionExample">
        <!--First card-->
        <div class="card" id="cardOne">
          <!--Card header-->
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button
                class="btn collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <h2 class="mt-1 mb-0">
                  <span>Utilizadores</span>
                  <i class="fas fa-angle-down rotate-icon"></i>
                </h2>
              </button>
            </h2>
          </div>

          <!--Card Body-->
          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <div class="panel-group" id="userTable">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <table class="table table-striped table-sm">
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
                              id="removeU"
                              @click="removeUser(user.id)"
                            >
                              <span class="glyphicon glyphicon-remove"></span>
                            </button>
                          </td>
                          <td>
                            <button
                              id="changeUser"
                              type="button"
                              class="btn btn-lg"
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
          </div>
        </div>

        <!--Second Card-->
        <div class="card">
          <!--Card header-->
          <div class="card-header" id="headingTwo">
            <h2 class="mb-0">
              <button
                class="btn collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <h2 class="mt-1 mb-0">
                  <span>Rotas</span>
                  <i class="fas fa-angle-down rotate-icon"></i>
                </h2>
              </button>
            </h2>
          </div>

          <!--Card Body-->
          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <div class="panel-group">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <table class="table table-striped table-sm" id="routeTable">
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
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                  <!--v-if="data.length > 5"-->
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Accordion card -->

    <div id="routeDiv">
      <div id="plane">
        <div id="upperBar">
          <h2 id="addR" class="card-title">Adicionar Percursos</h2>
        </div>

        <div class="form-group">
          <label for="title">Título</label>
          <input type="text" name="title" id="routeTitle" v-model="title" class="form-control" />
        </div>
        <div class="form-group">
          <label for="city">Cidade</label>
          <input type="text" name="city" id="routeCity" v-model="city" class="form-control" />
        </div>
        <div class="form-group">
          <label for="desc">Descrição</label>
          <textarea rows="4" name="desc" id="routeDesc" v-model="desc" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="audiolink">Link do audioguia (Soundcloud)</label>
          <input
            type="text"
            name="audiolink"
            id="audiolink"
            v-model="audiolink"
            class="form-control"
          />
          <br>
          
          
        </div>
        <div class="form-group">
          <!-- routeCategory -->
          <label for="routeCategory">Categoria:</label>
          <select
            v-for="category in this.$store.state.categories"
            :key="category.id"
            v-model="routeCategory"
          >
            <option>{{ category.name }}</option>
          </select>
        </div>
        <!-- É PRECISA ALGUMA FORMA DE MOSTRAR E SELECIONAR POIS POR ORDEM -->
        <br />Escolher pontos de interesse:
        <button
          name="addText"
          id="addText"
          class="btn btn-primary"
          role="button"
          @click="addShowPoiTextbox()"
        >Novo</button>
        <br />
        <p v-for="showPoi in showPois" :key="showPoi.name">
          <select v-model="showPoi.name">
            <option
              v-bind:key="poi"
              v-bind:value="poi"
              v-for="poi in $store.state.pois"
            >{{ poi.name }}</option>
          </select>
        </p>
        <br />
        <div class="form-group">
          <label for="dif">Dificuldade</label>
          <select v-model="dif" name="dif" class="form-control">
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>
        </div>
        <div id="addNew">
          <a
            name="addText2"
            id="addText2"
            class="btn btn-secondary btn-lg"
            href="#"
            role="button"
            @click="addRoute()"
          >Criar Rota</a>
          <br />
        </div>
      </div>
    </div>
    <div id="poiDiv">
      <div id="plane">
        <div id="upperBar">
          <h2 id="addR" class="card-title">Adicionar Pontos de interesse</h2>
        </div>
        <div class="addPoint">
          <button
            name="addText"
            id="addText"
            class="btn btn-primary"
            href="#"
            role="button"
            @click="addTextbox()"
          >Novo</button>

          <div class="input-group mb-3" id="points">
            <p v-for="(poi, index) in pois" :key="poi.id">
              <input type="text" v-model="poi.name" />
              <input type="button" @click="removeTextbox(index)" value="X" />
              <!-- CÓDIGO EM COMENTÁRIO ABAIXO AINDA NÃO ESTÁ FUNCIONAL -->
              <!-- <label>
                Carregar ficheiro de áudio
                <input
                  type="file"
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
              </label>
              <button v-on:click="submitFile()">Submit</button>-->
            </p>
          </div>
          <br />
          <button
            name="addText"
            id="addText"
            class="btn btn-secondary btn-lg"
            href="#"
            role="button"
            @click="addPoi()"
          >Pontos de interesse</button>
        </div>
      </div>

      <div id="categoryDiv">
        <div id="plane">
          <div id="upperBar">
            <h2 id="addR" class="card-title">Adicionar Categorias</h2>
          </div>
          <div class="addPoint">
            <div class="form-group">
              <label for="title">Nome</label>
              <input
                type="text"
                name="category"
                id="category"
                v-model="category"
                class="form-control"
              />
            </div>
            <br />
            <button
              name="addText"
              id="addText"
              class="btn btn-secondary btn-lg"
              href="#"
              role="button"
              @click="addCategory()"
            >Adicionar</button>
          </div>
        </div>
      </div>

      <div id="editDiv">
        <div id="plane">
          <div id="upperBar">
            <h2 id="addR" class="card-title">Editar Rotas</h2>
          </div>
          <div class="addPoint">
            <div class="form-group">
              <label for="title">Escolher Rota:</label>
              <select v-model="selectedRoute">
                <option
                  v-bind:key="route"
                  v-bind:value="route"
                  v-for="route in $store.state.appRoutes"
                >{{ route.title }}</option>
              </select>
            </div>
            <input type="radio" id="one" value="keep" v-model="picked" />
            <label for="one">Manter Pontos de interesse</label>
            <br />
            <input type="radio" id="two" value="change" v-model="picked" />
            <label for="two">Editar Pontos de interesse</label>
            <br />
            <br />
            <button
              name="addText"
              id="addText"
              class="btn btn-secondary btn-lg"
              href="#"
              role="button"
              @click="editRoute()"
            >Editar</button>
          </div>
        </div>
      </div>

      <div>
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
    dif: "",
    idTextbox: 0,
    users: [{}],
    appRoutes: [],
    newRoute: [{}],
    showPois: [],
    showRoutes: [],
    pois: [],
    idRoute: 0,
    name: "",
    coord: [],
    marker: [],
    lat: [],
    lng: "",
    myPos: null,
    mapPois: [],
    mapPoisTest: [],
    desc: "",
    map: "",
    routePois: [],
    selectCount: 0,
    file: "",
    categories: [],
    category: "",
    routeCategory: "",
    picked: "",
    oldPois: [],
    selectedRoute: "",
    curRoutePois: []
  }),

  created: function() {
    //load evertyhing on local storage when page is opened

    if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    }

    if (localStorage.getItem("pois")) {
      this.$store.state.pois = JSON.parse(localStorage.getItem("pois"));
      /* this.showPois = JSON.parse(localStorage.getItem("pois")); */
    }

    if (localStorage.getItem("appRoutes")) {
      this.$store.state.appRoutes = JSON.parse(
        localStorage.getItem("appRoutes")
      );
    }

    if (localStorage.getItem("categories")) {
      this.$store.state.categories = JSON.parse(
        localStorage.getItem("categories")
      );
    }
  },
  mounted: function() {
    this.renderMap();
  },
  methods: {
    /* handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    submitFile() {
      let formData = new FormData();

      formData.append("file", this.file);

      axios
        .post("/single-file", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    }, */

    //insert the map on the page
    renderMap() {
      this.map = new google.maps.Map(document.querySelector("#myMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });
    },

    //inserir textbox para pontos de interesse
    addTextbox() {
      this.idTextbox++;
      this.pois.push({ id: this.idTextbox, name: "", lat: "", lng: "" });
    },
    //not an actual textbox btw, it's a select
    addShowPoiTextbox() {
      this.selectCount++;
      this.showPois.push({ name: "" });
    },

    getLastRouteId() {
      return this.$store.getters.getLastRouteId;
    },

    getLastCategoryId() {
      return this.$store.getters.getLastCategoryId;
    },

    //remover
    removeTextbox(index) {
      this.pois.splice(index, 1);
    },

    //Upgrade ou downgrade user
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

    /* handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(this.map);
    }, */

    /* calcRoute: function(directionsService, directionsRenderer) {
      let mapPois2 = [];
      let timee = "";
      let distancee = "";
      this.$store.state.pois.forEach(function(poi) {
        mapPois2.push({
          location: new google.maps.LatLng(poi.lat, poi.lng),
          stopover: true
        });
      });
      this.mapPois = mapPois2; */

    // Creation of a DirectionsRequest object
    /* const request = {
        origin: this.myPos,
        destination: this.mapPois[this.mapPois.length - 1].location,
        waypoints: this.mapPois.slice(0, -1),
        travelMode: google.maps.DirectionsTravelMode.WALKING,
        optimizeWaypoints: true
      }; */

    /* directionsService.route(request, (result, status) => {
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
        this.distance = distancee;
      }); 
    },*/

    //AVISO: ESTA FUNÇÃO MUDOU DE NOME
    addPoi() {
      /* const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.map); */
      const geocoder = new google.maps.Geocoder();
      this.geocodeAddress(geocoder, this.map);
      /* this.calcRoute(directionsService, directionsRenderer); */
    },

    //AVISO: ESTA FUNÇÃO TEM O NOME DE OUTRA FUNÇÃO ANTIGA, MUDAR NO FORM
    addRoute() {
      for (let i = 0; i < this.showPois.length; i++) {
        this.routePois[i] = this.showPois[i].name;
      }
      this.$store.commit("ADD_ROUTE", {
        id: Number(this.getLastRouteId()) + 1,
        title: this.title,
        city: this.city,
        dif: this.dif,
        routePois: this.routePois,
        routeCategory: this.routeCategory,
        /* distance: this.$store.state.distance,
            time: this.$store.state.time, */
        desc: this.desc,
        audiolink: this.audiolink
      });
    },

    editRoute() {
      if (this.picked == "change") {
        //Mostrar pontos atuais
        //Mandar caixas para os novos pontos de interesse
      }

      /* this.$store.commit("EDIT_ROUTE", {
        title: this.newTitle,
        city: this.newCity,
        dif: this.newDif,
        routePois: this.newRoutePois,
        routeCategory: this.newRouteCategory,
        desc: this.newDesc
      }); */
    },

    addCategory() {
      this.$store.commit("ADD_CATEGORY", {
        id: Number(this.getLastCategoryId()) + 1,
        name: this.category
      });
    },

    geocodeAddress(geocoder) {
      let markerr = [];
      let address = [];
      for (let i = 0; i < this.pois.length; i++) {
        address[i] = this.pois[i].name;

        geocoder.geocode({ address: address[i] }, (results, status) => {
          if (status === "OK") {
            this.map.setCenter(results[0].geometry.location);

            markerr = new google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location
            });

            markerr.setMap(this.map);
            this.coord = markerr;
            /* this.marker = markerr; */

            /* this.$store.state.lat = markerr.getPosition().lat();
            this.$store.state.lng = markerr.getPosition().lng(); */
            this.$store.commit("ADD_POI", {
              idRoute: Number(this.getLastRouteId()) + 1,
              name: address[i],
              lat: this.coord.getPosition().lat(),
              lng: this.coord.getPosition().lng()
            });
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      }

      //return
    }
  }
};
</script>

<style scoped type="text/css">
@import url("//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css");

#mainDiv {
  margin: 0 auto;
  position: relative;
  align-content: center;
  vertical-align: center;
  color: grey;
}

.google-map {
  position: relative;
  padding-bottom: 45%;
  height: 0%;
  width: 60%;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 5px 10px 12px #888888;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

#routeDiv {
  margin: 0 auto;
  position: relative;
  text-align: center;
  align-content: center;
  font-family: "Catamaran", sans-serif;
}

#mapDiv {
  padding-top: 4%;
}

#addR {
  padding-bottom: 40px;
  padding-top: 50px;
  color: black;
  font-family: "EB Garamond", serif;
  font-size: 32px;
}

.container {
  padding-right: 10%;
}

#titleDesc {
  margin: auto;
  position: relative;
  padding-bottom: 2%;
}

#cityDif {
  margin: 0 auto;
  position: relative;
  padding-bottom: 4%;
}

#plane {
  background-color: white;
  color: black;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 80px;
  margin-top: 20px;
  box-shadow: 5px 10px 12px #888888;
}

form {
  width: 80%;
  margin: auto;
  padding-bottom: 4%;
}

#points {
  margin: 0 auto;
  margin-left: 100px;
  align-content: center;
  position: relative;
  padding-top: 2%;
}

.addPoint {
  margin: 0 auto;
  align-content: center;
  position: relative;
}

#addNew {
  padding-bottom: 5%;
}

#addText {
  width: 48%;
  height: 40px;
  background-color: black;
  border: none;
}

#addText:hover {
  background-color: rgba(134, 26, 98, 0.8);
}

#addText2 {
  margin: 0 auto;
  padding: auto;
  width: 48%;
  height: 40px;
  background-color: black;
  border: none;
}

#addText2:hover {
  background-color: rgba(134, 26, 98, 0.8);
}

input[type="text"],
select.form-control {
  margin: 0 auto;
  width: 60%;
}

#routeDesc,
select.form-control {
  width: 60%;
  margin: 0 auto;
}

hr {
  width: 48%;
}

#upperBar {
  background-color: rgb(216, 152, 68);
}

form {
  padding-top: 20px;
}

#changeUser {
  background-color: rgba(134, 26, 98, 0.8);
  color: white;
}

button.btn-danger {
  background-color: black;
  color: white;
  border: black;
}

/*--------------Accordion tables--------------*/

.accordion .card .card-header button:not(.collapsed) .rotate-icon {
  transform: rotate(180deg);
}

.container-fluid {
  width: 75%;
}

.card,
.card-header {
  border: none;
  padding: 0;
  margin-bottom: 80px;
}

.card {
  box-shadow: 5px 10px 12px #bbbbbb;
}

.card-header {
  background-color: rgb(216, 152, 68);
  padding: 20px 0px 20px 0px;
}

.card-body {
  margin: 0 auto;
  position: relative;
  align-items: center;
  text-align: center;
  border: none;
}

.table {
  margin: 0 auto;
  align-items: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

#cardOne {
  margin-top: 0rem;
}

.collapse {
  overflow: hidden;
}

.accordion {
  margin-top: 50px;
  margin-bottom: 150px;
}
</style>
