<template>
  <div id = "main" class="row">
    <div class="container">
      <div id="app">
        <div id="titulo1" class="row">
          <div class="col-sm-12">
            <h2 class="display-4">Vila do Conde</h2>
            <br />
          </div>
        </div>
        <div id="details" class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-10 text-left">
            <h2>Sobre</h2>
            <br />
            <p>
              Vila do Conde é uma freguesia portuguesa do concelho de Vila do Conde, com 6,78 km² de área, 28 636
              habitantes e densidade populacional de 4 223,6 hab/km². Estão ligadas a esta cidade numerosas figuras
              relevantes da história portuguesa, como Afonso Sanches, Manuel de Sá, Gaspar Manuel...
            </p>
            <br />
            <h2>Detalhes</h2>
            <div class="card border-0">
              <div class="card-body">
                <table class="table table-sm">
                  <tbody>
                    <tr>
                      <th scope="row">
                        <i class="fas fa-walking"></i>
                      </th>
                      <td>7 Km</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i class="fas fa-map-marker-alt"></i>
                      </th>
                      <td>Igreja Matriz, Mosteiro Santa Clara</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i class="far fa-clock"></i>
                      </th>
                      <td>2h30</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i class="fas fa-signal"></i>
                      </th>
                      <td>Dificil</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i class="fas fa-star-half-alt"></i>
                      </th>
                      <td>4.2/5</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <br />
            <h2>Pontos de Interesse</h2>
            <img class="img-fluid" src="../assets/mapa.jpg" alt="Mapa" width="600" height="800" />
            <br />
            <br />
            <h2>Audio Guia</h2>
            <audio controls="controls">
              <source src="../assets/music.mp3" type="audio/mp3" />seu navegador não suporta HTML5
            </audio>
          </div>
        </div>
      </div>
<<<<<<< HEAD
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

      

>>>>>>> 1a6ba7629b3c6a6dff05d28018d8dccb9bf53758
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
    path: window.location.pathname
  }),

  methods: {
    saveStorage() {
      localStorage.setItem(
        "comments",
        JSON.stringify(this.$store.state.comments)
      );
    }
  },

  created: function() {
    if (localStorage.getItem("comments")) {
      this.$store.state.comments = JSON.parse(localStorage.getItem("comments"));
    }
    alert(this.$store.state.currentRoute)
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

<<<<<<< HEAD
#main{
  margin-right: 15%
}
=======
/* BOTOES DE PARTILHA */

.resp-sharing-button__link,
.resp-sharing-button__icon {
  display: inline-block
}

.resp-sharing-button__link {
  text-decoration: none;
  color: #fff;
  margin: 0.5em
}

.resp-sharing-button {
  border-radius: 5px;
  transition: 25ms ease-out;
  padding: 0.5em 0.75em;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif
}

.resp-sharing-button__icon svg {
  width: 1em;
  height: 1em;
  margin-right: 0.4em;
  vertical-align: top
}

.resp-sharing-button--small svg {
  margin: 0;
  vertical-align: middle
}

/* Non solid icons get a stroke */
.resp-sharing-button__icon {
  stroke: #fff;
  fill: none
}

/* Solid icons get a fill */
.resp-sharing-button__icon--solid,
.resp-sharing-button__icon--solidcircle {
  fill: #fff;
  stroke: none
}

.resp-sharing-button--twitter {
  background-color: #55acee
}

.resp-sharing-button--twitter:hover {
  background-color: #2795e9
}

.resp-sharing-button--pinterest {
  background-color: #bd081c
}

.resp-sharing-button--pinterest:hover {
  background-color: #8c0615
}

.resp-sharing-button--facebook {
  background-color: #3b5998
}

.resp-sharing-button--facebook:hover {
  background-color: #2d4373
}

.resp-sharing-button--tumblr {
  background-color: #35465C
}

.resp-sharing-button--tumblr:hover {
  background-color: #222d3c
}

.resp-sharing-button--reddit {
  background-color: #5f99cf
}

.resp-sharing-button--reddit:hover {
  background-color: #3a80c1
}

.resp-sharing-button--google {
  background-color: #dd4b39
}

.resp-sharing-button--google:hover {
  background-color: #c23321
}

.resp-sharing-button--linkedin {
  background-color: #0077b5
}

.resp-sharing-button--linkedin:hover {
  background-color: #046293
}

.resp-sharing-button--email {
  background-color: #777
}

.resp-sharing-button--email:hover {
  background-color: #5e5e5e
}

.resp-sharing-button--xing {
  background-color: #1a7576
}

.resp-sharing-button--xing:hover {
  background-color: #114c4c
}

.resp-sharing-button--whatsapp {
  background-color: #25D366
}

.resp-sharing-button--whatsapp:hover {
  background-color: #1da851
}

.resp-sharing-button--hackernews {
background-color: #FF6600
}
.resp-sharing-button--hackernews:hover, .resp-sharing-button--hackernews:focus {   background-color: #FB6200 }

.resp-sharing-button--vk {
  background-color: #507299
}

.resp-sharing-button--vk:hover {
  background-color: #43648c
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


>>>>>>> 1a6ba7629b3c6a6dff05d28018d8dccb9bf53758
</style>