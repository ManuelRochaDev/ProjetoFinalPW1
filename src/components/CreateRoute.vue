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
                        <tr v-for="user in this.$store.state.APIUsers" :key="user.id">
                          <td>{{user.id_user}}</td>
                          <td>{{user.email}}</td>
                          <td>{{user.name}}</td>
                          <td>{{user.lastName}}</td>
                          <td v-if="user.userType==0">Administrador</td>
                          <td v-else>Normal</td>
                          <td v-if="user.isBlocked">Bloqueado</td>
                          <td v-else>Ativo</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger btn-lg"
                              id="removeU"
                              @click="removeUser(user.id_user)"
                            >
                              <span class="glyphicon glyphicon-remove"></span>
                            </button>
                          </td>
                          <td>
                            <button
                              id="changeUser"
                              type="button"
                              class="btn btn-lg"
                              @click="changeUsertype(user.id_user)"
                            >
                              <span class="glyphicon glyphicon-resize-vertical"></span>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-secondary btn-lg"
                              @click="blockUser(user.id_user)"
                            >
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
              <userPagination
                v-bind:users="users"
                v-on:page:update="updateUserPage"
                v-bind:currentUserPage="currentUserPage"
                v-bind:pageUserSize="pageUserSize"
              ></userPagination>
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
                        <tr v-for="appRoute in this.$store.state.APIAppRoutes" :key="appRoute.id">
                          <td>{{appRoute.id_route}}</td>
                          <td>{{appRoute.title}}</td>
                          <td>{{appRoute.city}}</td>
                          <td>
                            <button
                              v-if="appRoute.id !== 0"
                              type="button"
                              class="btn btn-danger btn-lg"
                              @click="removeRoute(appRoute.id_route)"
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
          <h2 id="addR" class="card-title">Adicionar Rotas</h2>
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
          <label for="distance">Distância (em metros)</label>
          <input type="text" name="distance" id="routeCity" v-model="distance" class="form-control" />
        </div>
        <div class="form-group">
          <label for="time">Tempo (em minutos)</label>
          <input type="text" name="time" id="routeCity" v-model="time" class="form-control" />
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
          <br />
        </div>
        <div class="form-group">
          <!-- routeCategory -->
          <label for="routeCategory">Categoria:</label>
          <select v-model="routeCategory">
            <option
              v-for="category in this.$store.state.APICategories"
              v-bind:key="category"
              v-bind:value="category"
            >{{ category.name }}</option>
          </select>
          <!-- <select v-model="selectedRoute" @change="chooseRoute()">
                <option
                  v-bind:key="route"
                  v-bind:value="route"
                  v-for="route in $store.state.APIAppRoutes"
                >{{ route.title }}</option>
          </select>-->
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
              v-for="poi in $store.state.APIPois"
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

              <select v-model="selectedRoute" @change="chooseRoute()">
                <option
                  v-bind:key="route"
                  v-bind:value="route"
                  v-for="route in $store.state.APIAppRoutes"
                >{{ route.title }}</option>
              </select>
              <br />
              <label for="title">(Nota: Deixar os campos em branco se não quiser alterar)</label>
            </div>

            <div v-for="oldRoute in this.routeArray" :key="oldRoute.id">
              <div class="form-group">
                <label for="title">Título ({{oldRoute.title}})</label>
                <input
                  type="text"
                  name="title"
                  id="routeTitle"
                  v-model="newTitle"
                  class="form-control"
                />
              </div>

              <div class="form-group">
                <label for="city">Cidade ({{oldRoute.city}})</label>
                <input
                  type="text"
                  name="city"
                  id="routeCity"
                  v-model="newCity"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="desc">Descrição ({{oldRoute.desc}})</label>
                <textarea
                  rows="4"
                  name="desc"
                  id="routeDesc"
                  v-model="newDesc"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="audiolink">Link do audioguia ({{oldRoute.audiolink}})</label>
                <input
                  type="text"
                  name="audiolink"
                  id="audiolink"
                  v-model="newAudiolink"
                  class="form-control"
                />
                <br />
              </div>

              <div class="form-group">
                <label for="dif">Dificuldade ({{oldRoute.dif}})</label>
                <select v-model="newDif" name="dif" class="form-control">
                  <option value="easy">Fácil</option>
                  <option value="medium">Médio</option>
                  <option value="hard">Difícil</option>
                </select>
              </div>
            </div>
            <br />
          </div>
          <input type="radio" id="one" value="keep" v-model="picked" checked />
          <label for="one">Manter Pontos de interesse</label>
          <br />
          <input type="radio" id="two" value="change" v-model="picked" />
          <label for="two">Editar Pontos de interesse</label>
          <!-- SÓ MOSTRAR SE QUISER MUDAR -->
          <div v-if="this.picked == 'change'">
            <br />Escolher novos pontos de interesse:
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
          </div>

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
      <div>
        <br />
        <div class="google-map" id="myMap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import axios from "axios";
import UserPagination from "@/components/UserPagination.vue";
export default {
  name: "createRoute",
  components: {
    UserPagination
  },
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
    selectedRoute: [],
    curRoutePois: [],
    routeArray: [],
    newTitle: "",
    newCity: "",
    newRoutePois: "",
    newRouteCategory: "",
    newDesc: "",
    newDif: "",
    oldRoute: []
  }),

  created: function() {
    //load evertyhing on local storage when page is opened
    /* if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    } */
    /* if (localStorage.getItem("pois")) {
      this.$store.state.pois = JSON.parse(localStorage.getItem("pois"));
    } */
    /* if (localStorage.getItem("appRoutes")) {
      this.$store.state.appRoutes = JSON.parse(
        localStorage.getItem("appRoutes")
      );
    } */
    /* if (localStorage.getItem("categories")) {
      this.$store.state.categories = JSON.parse(
        localStorage.getItem("categories")
      );
    } */
  },
  mounted: function() {
    this.renderMap();
    this.$store.dispatch("getUsers");
    this.$store.dispatch("getAppRoutes");
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getPois");
  },
  methods: {

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
      if (confirm("Tem a certeza que quer atualizar utilizador?")) {
        axios
          .put(
            "http://" +
              this.$store.state.API_ADDRESS +
              "/users/upgrade/" +
              userId,
            {
              id_user: userId,
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(
            swal.fire("Sucesso", "Utilizador atualizado com successo", "info")
          )
          .catch(function(error) {
            swal.fire("Erro", error, "warning");
          });
        location.reload();
      }
    },

    removeUser(userId) {
      /* alert(userId); */
      if (confirm("Tem a certeza que pretende apagar o utilizador?")) {
        axios
          .delete(
            "http://" + this.$store.state.API_ADDRESS + "/users/" + userId,
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(swal.fire("Sucesso", "Utilizador removido", "info"))
          .catch(function(error) {
            swal.fire("Erro", error, "warning");
          });
        location.reload();
        /* this.$store.commit("REMOVE_USER", {
          id: userId
        }); */
      }
    },

    removeRoute(routeId) {
      if (confirm("Tem a certeza que pretende remover esta rota?")) {
        axios
          .delete(
            "http://" + this.$store.state.API_ADDRESS + "/routes/" + routeId,
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(swal.fire("Sucesso", "Rota removida", "info"))
          .catch(function(error) {
            swal.fire("Erro", error, "warning");
          });
        location.reload();
        /* this.$store.commit("REMOVE_USER", {
          id: userId
        }); */
      }
    },

    blockUser(userId) {
      alert(userId);
      if (confirm("Tem a certeza que quer bloquear/desbloquear utilizador?")) {
        axios
          .put(
            "http://" +
              this.$store.state.API_ADDRESS +
              "/users/block/" +
              userId,
            {
              id_user: userId,
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(
            swal.fire("Sucesso", "Utilizador bloqueado com successo", "info")
          )
          .catch(function(error) {
            swal.fire("Erro", error, "warning");
          });
        location.reload();
      }
    },

    //AVISO: ESTA FUNÇÃO MUDOU DE NOME
    addPoi() {
      const geocoder = new google.maps.Geocoder();
      this.geocodeAddress(geocoder, this.map);
    },

    addRoute() {
      for (let i = 0; i < this.showPois.length; i++) {
        this.routePois[i] = this.showPois[i].name;
      }
      axios
        .post("http://" + this.$store.state.API_ADDRESS + "/routes/", {
          title: this.title,
          city: this.city,
          dif: this.dif,
          routePois: this.routePois,
          id_category: this.routeCategory,
          distance: this.distance,
          time: this.time,
          desc: this.desc,
          audiolink: this.audiolink,

          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.APILoginData = response;
          if (response.data == "success") {
            swal.fire("Nova rota", "Rota criada com sucesso", "info");
          } else {
            swal.fire("Erro", "Por favor tente mais tarde", "warning");
          }
        })
        .catch(function(error) {
          alert("erro: " + error);
        })
        .finally(() => (this.loading = false));
    },

    /* this.$store.commit("ADD_ROUTE", {
        id: Number(this.getLastRouteId()) + 1,
        title: this.title,
        city: this.city,
        dif: this.dif,
        routePois: this.routePois,
        routeCategory: this.routeCategory,
        /distance: this.$store.state.distance,
        /time: this.$store.state.time,
        desc: this.desc,
        audiolink: this.audiolink
      }); */

    chooseRoute() {
      this.routeArray = [];
      this.routeArray.push(this.selectedRoute);
    },

    editRoute() {
      //Só comitar se o campo não estiver vazio
      if (this.newTitle == "") {
        this.newTitle = this.routeArray[0].title;
      }
      if (this.newSelectedRoute == "") {
        this.nnewSelectedRoute = this.routeArray[0].selectedRoute;
      }
      if (this.newCity == "") {
        this.newCity = this.routeArray[0].city;
      }
      if (this.newRoutePois == "") {
        this.newRoutePois = this.routeArray[0].routePois;
      }
      if (this.newDesc == "") {
        this.newDesc = this.routeArray[0].desc;
      }

      this.$store.commit("EDIT_ROUTE", {
        id: this.routeArray[0].id,
        newTitle: this.newTitle,
        newCity: this.selectedRoute.city,
        newDif: this.selectedRoute.dif,
        newRoutePois: this.selectedRoute.routePois,
        newDesc: this.selectedRoute.desc
      });
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

            //API está a dar 1 minuto de tempo e 1 metro de distância, vamos inserir os valores manualmente
            /* this.$store.state.lat = markerr.getPosition().lat();
            this.$store.state.lng = markerr.getPosition().lng(); */
            axios
              .post("http://" + this.$store.state.API_ADDRESS + "/pois/", {
                idRoute: Number(this.getLastRouteId()) + 1,
                name: address[i],
                lat: this.coord.getPosition().lat(),
                long: this.coord.getPosition().lng(),

                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(response => {
                this.APILoginData = response;
                if (response.data == "success") {
                  swal.fire(
                    "Nova rota",
                    "Ponto de interesse criado com sucesso",
                    "info"
                  );
                } else {
                  swal.fire("Erro", "Por favor tente mais tarde", "warning");
                }
              })
              .catch(function(error) {
                alert("erro: " + error);
              })
              .finally(() => (this.loading = false));

            /* this.$store.commit("ADD_POI", {
              idRoute: Number(this.getLastRouteId()) + 1,
              name: address[i],
              lat: this.coord.getPosition().lat(),
              lng: this.coord.getPosition().lng()
            }); */
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
  margin-bottom: 15%;
  box-shadow: 5px 10px 12px rgba(0, 0, 0, 0.5);
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
  box-shadow: 5px 10px 12px rgba(0, 0, 0, 0.5);
}

form {
  width: 80%;
  margin: auto;
  padding-bottom: 4%;
}

#points {
  margin: 0 auto;
  margin-left: 5%;
  position: relative;
  padding-bottom: 5%;
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
  background-color: rgb(134, 26, 98);
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
  background-color: rgb(134, 26, 98);
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
  background-color: rgb(134, 26, 98);
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
  overflow-x: auto;
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

.glyphicon {
  margin: 0 auto;
  padding: 3px 3px 3px 3px;
}

.fa-angle-down {
  padding-right: 5px;
  padding-left: 5px;
}
</style>
