<template>
  <div>
    <div id="main">
      <div id="titulo1">
        <h2 id="title" class="display-3">{{this.$store.state.currentRoute.title}}</h2>
      </div>
      <div id="details" class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8 text-center">
          <h2 class="text-center">Detalhes</h2>
          <h4>{{this.$store.state.currentRoute.desc}}</h4>
          <div id="info">
            <div class="card-body">
              <table id="descTable" class="table table-sm">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <th classscope="row">
                      <pre class="tab"><i class="fas fa-walking"></i> &nbsp; Distância</pre>
                    </th>
                    <td class="descData">{{this.curDistance}}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <pre class="tab"><i class="fas fa-clock"></i>  Duração</pre>
                    </th>
                    <td class="descData">{{this.curTime}}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <pre class="tab"><i class="fas fa-signal"></i>  Dificuldade</pre>
                    </th>
                    <td class="descData" v-if="this.$store.state.currentRoute.dif == 'easy'">Fácil</td>
                    <td class="descData" v-if="this.$store.state.currentRoute.dif == 'medium'">Médio</td>
                    <td class="descData" v-if="this.$store.state.currentRoute.dif == 'hard'">Difícil</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <pre class="tab"><i class="fas fa-comment"></i>  Comentários</pre>
                    </th>
                    <td class="descData">{{ this.commentsNumber }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div class="google-map" id="myMap"></div>
          <iframe
            id="soundcloud_widget"
            :src=" this.curAudio "
            width="420"
            height="120"
            frameborder="no"
          ></iframe>
        </div>
      </div>

      <!-- Sharingbutton Facebook -->
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

      <div id="cont" class="container">
        <div class="comments">
          <AddComment></AddComment>
          <div class="container">
            <Comments></Comments>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddComment from "@/components/AddComment.vue";
import Comments from "@/components/Comments.vue";
export default {
  name: "detalhesPercurso",
  components: {
    AddComment,
    Comments
  },

  data: () => ({
    comments: [],
    path: window.location.pathname,
    mapPois: [],
    curDistance: 0,
    curTime: 0,
    commentsNumber: 0,
    curAudio: ""
    /* myPos: null */
  }),

  async mounted() {
    this.renderMap();
    this.allComments();
  },

  methods: {
    //insert the map on the page
    renderMap() {
      /* 
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
      } */
      //this.calcRoute(directionsService, directionsRenderer);
      this.map = new google.maps.Map(document.querySelector("#myMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.map);
      this.calcRoute(directionsService, directionsRenderer);
    },

    saveStorage() {
      localStorage.setItem(
        "comments",
        JSON.stringify(this.$store.state.comments)
      );
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

      //Gotta grab points of interest from the selected route
      this.mapPois = this.$store.state.currentRoute.routePois;

      this.mapPois.forEach(function(poi) {
        mapPois2.push({
          location: new google.maps.LatLng(poi.lat, poi.lng),
          stopover: true
        });
      });
      this.mapPois = mapPois2;

      /* this.mapPois = this.mapPois.filter(
        poi => poi.idRoute === this.$store.state.currentRoute.id
      ); */

      // Creation of a DirectionsRequest object
      const request = {
        origin: this.mapPois[0].location,
        destination: this.mapPois.slice(-1)[0].location,
        waypoints: this.mapPois.slice(0, -1),
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
          alert(status);
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
    if (localStorage.getItem("comments")) {
      this.$store.state.comments = JSON.parse(localStorage.getItem("comments"));
    }
    if (localStorage.getItem("currentRoute")) {
      this.$store.state.currentRoute = JSON.parse(
        localStorage.getItem("currentRoute")
      );
    }

    this.curAudio =
      "https://w.soundcloud.com/player/?url=" +
      this.$store.state.currentRoute.audiolink +
      "&show_artwork=false&liking=false&sharing=false&auto_play=false";

    if (localStorage.getItem("appRoutes")) {
      this.$store.state.appRoutes = JSON.parse(
        localStorage.getItem("appRoutes")
      );
    }

    if (localStorage.getItem("pois")) {
      this.$store.state.pois = JSON.parse(localStorage.getItem("pois"));
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Arial";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

#descTable {
  margin: 0 auto;
  text-align: center;
}

.descData {
  padding-right: 10%;
}

.text-center {
  margin-top: 20px;
  margin-bottom: 20px;
}

#title {
  padding-top: 20px;
  padding-bottom: 20px;
}

#info {
  margin: 0 auto;
  text-align: center;
  padding-right: 20%;
  padding-left: 30%;
}

#details {
  margin: auto;
}

#comments {
  color: grey;
}

#cont {
  margin: 0 auto;
  position: relative;
}

.google-map {
  position: relative;
  padding-bottom: 70%;
  height: 0;
  overflow: hidden;
  margin: auto;
  box-shadow: 5px 10px 12px #888888;
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
  margin-bottom: 40px;
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
  color: rgba(134, 26, 98, 0.8);
  text-align: left;
  float: left;
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