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
      <br />
      <br />
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
    comments: []
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

#main{
  margin-right: 15%
}
</style>