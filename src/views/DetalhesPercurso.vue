<template>
  <div class="row">
    <div class="container">
      <div id="app">
        <div id="titulo1" class="row">
          <div class="col-sm-12">
            <h2>Vila do Conde</h2>
            <br />
          </div>
        </div>
        <div id="details" class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8 text-left">
            <h4>Sobre</h4>
            <br />
            <p>
              Vila do Conde é uma freguesia portuguesa do concelho de Vila do Conde, com 6,78 km² de área, 28 636
              habitantes e densidade populacional de 4 223,6 hab/km². Estão ligadas a esta cidade numerosas figuras
              relevantes da história portuguesa, como Afonso Sanches, Manuel de Sá, Gaspar Manuel...
            </p>
            <br />
            <h4>Detalhes</h4>
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
            <h4>Pontos de Interesse</h4>
            <img class="img-fluid" src="mapa.jpg" alt="Mapa" width="600" height="800" />
          </div>
        </div>
      </div>
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
</style>