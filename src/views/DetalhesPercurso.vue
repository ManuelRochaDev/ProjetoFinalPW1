<template>
  <div id = "main" class="row">
    <div class="container">
      <div>
        <div id="titulo1" class="row">
          <div class="col-sm-12">
            <h2 class="display-4">{{this.$store.state.currentRoute.title}}</h2>
            <br />
          </div>
        </div>
        <div id="details" class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8 text-left">
            <h4>Detalhes</h4>
            <h4>{{this.$store.state.currentRoute.desc}}</h4>
            <div class="card border-0">
              <div class="card-body">
                <table class="table table-sm">
                  <tbody>
                    <tr>
                      <th scope="row">
                        <i class="fas fa-walking"></i>
                      </th>
                      <td>{{this.$store.state.currentRoute.distance}}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i class="far fa-clock"></i>
                      </th>
                      <td>{{this.$store.state.currentRoute.time}}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i class="fas fa-signal"></i>
                      </th>
                      <td v-if="this.$store.state.currentRoute.dif == 'easy'">Fácil</td>
                      <td v-if="this.$store.state.currentRoute.dif == 'medium'">Médio</td>
                      <td v-if="this.$store.state.currentRoute.dif == 'hard'">Difícil</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i class="fas fa-comment"></i>
                      </th>
                      <td>5</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <br />
            <div class="google-map" id="myMap"></div>
            <audio controls="controls">
              <source src="../assets/music.mp3" type="audio/mp3" />seu navegador não suporta HTML5
            </audio>
          </div>
        </div>
      </div>
      <br />
      <br />
=======

      <!-- Sharingbutton Facebook -->
      <a
        class="resp-sharing-button__link"
        v-bind:href="'https://www.facebook.com/sharer/sharer.php/?u=' + ''"
        target="_blank"
        rel="noopener"
        aria-label="Share on Facebook"
      >
        {{this.path}}
        <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large">
          <div
            aria-hidden="true"
            class="resp-sharing-button__icon resp-sharing-button__icon--circle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="11.5" />
              <path
                d="M15.84 9.5H13.5V8.48c0-.53.35-.65.6-.65h1.4v-2.3h-2.35c-2.3 0-2.65 1.7-2.65 2.8V9.5h-2v2h2v7h3v-7h2.1l.24-2z"
              />
            </svg>
          </div>Share on Facebook
        </div>
      </a>


      <AddComment></AddComment>
      <Comments
        v-for="comment in this.$store.state.comments"
        :key="comment.id"
        v-bind:comment="comment"
      ></Comments>
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
    myPos: null
  }),

  async mounted() {
    this.renderMap();
  },

  methods: {
    //insert the map on the page
    renderMap() {
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

      this.mapPois = this.$store.state.pois;

      this.$store.state.pois.forEach(function(poi) {
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
        } else {
          alert(status);
        }
      });
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
  color: #671919;
}

#cards i {
  color: #671919;
}

table td {
  border: none !important;
}

table th {
  border-bottom: 2px;
  border-top: none !important;
}

#cardTitle {
  border-bottom: 2px;
  border-top: none !important;
  background-color: #671919 !important;
  color: #fff !important;
}

#titulo {
  padding-left: 60px;
}


.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
}



#main{
  margin-right: 15%
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

.resp-sharing-button--twitter {
  background-color: #55acee;
}

.resp-sharing-button--twitter:hover {
  background-color: #2795e9;
}

.resp-sharing-button--pinterest {
  background-color: #bd081c;
}

.resp-sharing-button--pinterest:hover {
  background-color: #8c0615;
}

.resp-sharing-button--facebook {
  background-color: #3b5998;
}

.resp-sharing-button--facebook:hover {
  background-color: #2d4373;
}

.resp-sharing-button--tumblr {
  background-color: #35465c;
}

.resp-sharing-button--tumblr:hover {
  background-color: #222d3c;
}

.resp-sharing-button--reddit {
  background-color: #5f99cf;
}

.resp-sharing-button--reddit:hover {
  background-color: #3a80c1;
}

.resp-sharing-button--google {
  background-color: #dd4b39;
}

.resp-sharing-button--google:hover {
  background-color: #c23321;
}

.resp-sharing-button--linkedin {
  background-color: #0077b5;
}

.resp-sharing-button--linkedin:hover {
  background-color: #046293;
}

.resp-sharing-button--email {
  background-color: #777;
}

.resp-sharing-button--email:hover {
  background-color: #5e5e5e;
}

.resp-sharing-button--xing {
  background-color: #1a7576;
}

.resp-sharing-button--xing:hover {
  background-color: #114c4c;
}

.resp-sharing-button--whatsapp {
  background-color: #25d366;
}

.resp-sharing-button--whatsapp:hover {
  background-color: #1da851;
}

.resp-sharing-button--hackernews {
  background-color: #ff6600;
}
.resp-sharing-button--hackernews:hover,
.resp-sharing-button--hackernews:focus {
  background-color: #fb6200;
}

.resp-sharing-button--vk {
  background-color: #507299;
}

.resp-sharing-button--vk:hover {
  background-color: #43648c;
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

.resp-sharing-button--twitter {
  background-color: #55acee;
  border-color: #55acee;
}

.resp-sharing-button--twitter:hover,
.resp-sharing-button--twitter:active {
  background-color: #2795e9;
  border-color: #2795e9;
}

.resp-sharing-button--email {
  background-color: #777777;
  border-color: #777777;
}

.resp-sharing-button--email:hover,
.resp-sharing-button--email:active {
  background-color: #5e5e5e;
  border-color: #5e5e5e;
}

</style>