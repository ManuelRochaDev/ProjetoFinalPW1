<template :style="myStyle">
  <div>
    <div></div>
    <div id="main">
      <div id="titulo1"></div>
      <div id="details" class="row">
        <div class="col-sm-2"></div>
        <div id="centerCol" class="col-sm-8 text-center">
          <h2 id="title" class="display-3">{{this.$store.state.currentRoute[0].title}}</h2>
          <h2 id="blackText" class="display-6">{{this.$store.state.currentRoute[0].description}}</h2>
          <div id="info">
            <h2 id="textCenter" class="text-center">Detalhes</h2>
            <div class="card-body">
              <table id="descTable" class="table table-sm">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-if="this.$store.state.currentRoute[0].id_category">
                    <th classscope="row">
                      <pre class="tab"><i class="fas fa-tags"></i>&nbsp;Categoria</pre>
                    </th>
                    <td class="descData">{{this.curCategory}}</td>
                  </tr>
                  <tr>
                    <th classscope="row">
                      <pre class="tab"><i class="fas fa-walking"></i> &nbsp; Distância</pre>
                    </th>
                    <td class="descData">{{this.$store.state.currentRoute[0].distance}} metros</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <pre class="tab"><i class="fas fa-clock"></i>  Duração</pre>
                    </th>
                    <td class="descData">{{this.$store.state.currentRoute[0].time}} minutos</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <pre class="tab"><i class="fas fa-signal"></i>  Dificuldade</pre>
                    </th>
                    <td
                      class="descData"
                      v-if="this.$store.state.currentRoute[0].difficulty == 'easy'"
                    >Fácil</td>
                    <td
                      class="descData"
                      v-if="this.$store.state.currentRoute[0].difficulty == 'medium'"
                    >Médio</td>
                    <td
                      class="descData"
                      v-if="this.$store.state.currentRoute[0].difficulty == 'hard'"
                    >Difícil</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <pre class="tab"><i class="fas fa-comment"></i>  Comentários</pre>
                    </th>
                    <td class="descData">5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="google-map" id="myMap"></div>
          <div id="audioguia">
            <iframe
              id="soundcloud_widget"
              :src=" this.curAudio "
              width="420"
              height="120"
              frameborder="no"
            ></iframe>
          </div>

          <a
            class="resp-sharing-button__link"
            v-bind:href="'https://www.facebook.com/sharer/sharer.php/?u=' + ''"
            target="_blank"
            rel="noopener"
            aria-label="Share on Facebook"
          >
            <div
              class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"
              id="share"
            >
              <div
                aria-hidden="true"
                class="resp-sharing-button__icon resp-sharing-button__icon--circle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 20 22">
                  <circle cx="10" cy="11" r="10" />
                  <path
                    d="M15.84 9.5H13.5V8.48c0-.53.35-.65.6-.65h1.4v-2.3h-2.35c-2.3 0-2.65 1.7-2.65 2.8V9.5h-2v2h2v7h3v-7h2.1l.24-2z"
                  />
                </svg>
                Share
              </div>
            </div>
          </a>

          <Rating :grade="3" :maxStars="5" :hasCounter="true" />

          <div id="cont" class="container">
            <div class="row comments">
              <div class="col-md-8"></div>
              <AddComment></AddComment>
              <div class="container">
                <Comments id="comments"></Comments>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import AddComment from "@/components/AddComment.vue";
import Comments from "@/components/Comments.vue";
import Rating from "@/components/Rating.vue";
import swal from "sweetalert2";
export default {
  name: "detalhesPercurso",
  components: {
    AddComment,
    Comments,
    Rating
  },

  data: () => ({
    comments: [],
    path: window.location.pathname,
    mapPois: [],
    mapPois2: [],
    curDistance: 0,
    curTime: 0,
    curCategory: "",
    commentsNumber: 0,
    curAudio: "",
    myStyle: {
      backgroundColor: "#861a62"
    }
    /* myPos: null */
  }),

  async mounted() {
    this.renderMap();
    this.allComments();
  },

  methods: {
    //insert the map on the page

    renderMap() {
      this.map = new google.maps.Map(document.querySelector("#myMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.map);
      this.calcRoute(directionsService, directionsRenderer);
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
      /* let mapPois2 = []; */

      //Gotta grab points of interest from the selected route
      this.mapPois = JSON.parse(this.$store.state.currentRoute[0].routePois);
      /* alert(this.mapPois.lat); */
      /* this.mapPois.forEach(function(poi) { */
      for (const poi of this.mapPois) {
        /* alert(poi.longitude) */

        this.mapPois2.push({
          location: new google.maps.LatLng(poi.lat, poi.longitude),
          stopover: true
          /* }); */
        });
      }

      // Creation of a DirectionsRequest object
      const request = {
        origin: this.mapPois2[0].location,
        destination: this.mapPois2.slice(-1)[0].location,
        waypoints: this.mapPois2.slice(0, -1),
        travelMode: google.maps.DirectionsTravelMode.WALKING,
        optimizeWaypoints: true
      };
      directionsService.route(request, (result, status) => {
        if (status == "OK") {
          directionsRenderer.setDirections(result);
          const directionsData = result.routes[0].legs[0];
          if (directionsData) {
            this.curTime = directionsData.duration.text;
            this.curDistance = directionsData.distance.text;
          } else {
            alert("Directions request failed");
          }
        } else {
          swal.fire(
            "Erro",
            "Erro do sistema. Por favor tente novamente mais tarde.",
            "warning"
          );
        }
      });
    },
    allComments() {
      for (let i = 0; i < this.$store.state.comments.length; i++) {
        if (
          this.$store.state.comments[i].id_route ==
          this.$store.state.currentRoute.id
        ) {
          this.commentsNumber++;
        }
      }
    }
  },

  created: function() {
    this.$store.dispatch("getCategories");
    for (const category of this.$store.state.APICategories) {
      /* alert(category.id_category)
      alert(this.$store.state.currentRoute[0].id_category) */
      if (
        category.id_category == this.$store.state.currentRoute[0].id_category
      ) {
        this.curCategory = category.name;
      }
    }

    this.curAudio =
      "https://w.soundcloud.com/player/?url=" +
      this.$store.state.currentRoute[0].audiolink +
      "&show_artwork=false&liking=false&sharing=false&auto_play=false";
  }
};
</script>

<style scoped>
body {
  background-color: white;
}

template {
  background-color: white;
}

#app {
  font-family: "Arial";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;
}

#centerCol {
  background-color: white;
  margin-top: 10%;
  padding-bottom: 200px;
}

.tab {
  tab-size: 2;
}

pre {
  font-family: "Catamaran", sans-serif;
  font-size: 14px;
  overflow: hidden;
}

.table {
  margin-bottom: 50px;
}

table td {
  border: none !important;
}

table th {
  border-bottom: 2px;
  border-top: none !important;
  float: left;
}

h2 {
  color: white;
}

.card-body {
  margin: 0 auto;
  text-align: center;
}

#descTable {
  margin: 0 auto;
  margin-left: 12%;
  text-align: center;
}

.descData {
  padding-right: 10%;
}

.text-center {
  margin-top: 5%;
  margin-bottom: 20px;
  color: black;
}

#title {
  margin-top: 10%;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #221d23;
}

#blackText {
  color: #221d23;
}

#info {
  margin: 0 auto;
  margin-bottom: 5%;
  text-align: center;
  padding-right: 20%;
  padding-left: 20%;
  background-color: white;
}

#details {
  margin: auto;
}

#comments {
  color: grey;
  margin-bottom: 5%;
}

#cont {
  margin: 0 auto;
  position: relative;
  width: 100%;
}

.google-map {
  position: relative;
  padding-bottom: 70%;
  height: 0;
  overflow: hidden;
  margin: auto;
  box-shadow: 5px 10px 12px #888888;
  width: 80%;
  height: 15%;
}

.google-maps iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}

#main {
  padding-top: 20px;
  text-align: center;
  align-content: center;
}

#audio {
  margin-top: 20px;
}

#audioguia {
  margin-top: 40px;
}

#share {
  margin-top: 40px;
}

.comments {
  margin: 0 auto;
  padding-top: 50px;
  align-content: center;
  width: 100%;
  font-size: 16px;
}

.fas {
  margin-left: 0;
  color: rgba(134, 26, 98, 1);
  text-align: left;
  float: left;
}

@media only screen and (max-width: 962px) {
  #centerCol {
    margin-top: 15%;
  }
}

/* BOTOES DE PARTILHA */

.resp-sharing-button__link,
.resp-sharing-button__icon {
  display: inline-block;
}

.resp-sharing-button__link {
  text-decoration: none;
  color: #fff;
  margin: 0.5em;
}

.resp-sharing-button {
  border-radius: 5px;
  transition: 25ms ease-out;
  padding: 0.5em 0.75em;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}

.resp-sharing-button__icon svg {
  width: 1em;
  height: 1em;
  margin-right: 0.4em;
  vertical-align: top;
}

.resp-sharing-button--small svg {
  margin: 0;
  vertical-align: middle;
}

/* Non solid icons get a stroke */
.resp-sharing-button__icon {
  stroke: #fff;
  fill: none;
}

/* Solid icons get a fill */
.resp-sharing-button__icon--solid,
.resp-sharing-button__icon--solidcircle {
  fill: #fff;
  stroke: none;
}

.resp-sharing-button--facebook {
  background-color: #3b5998;
}

.resp-sharing-button--facebook:hover {
  background-color: #2d4373;
}

.resp-sharing-button--facebook {
  background-color: #3b5998;
  border-color: #3b5998;
}

.resp-sharing-button--facebook:hover,
.resp-sharing-button--facebook:active {
  background-color: #2d4373;
  border-color: #2d4373;
}
</style>