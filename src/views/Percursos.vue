<template>
  <div id="cards" class="row">
    <div class="col-sm-1"></div>
    <div class="col-sm-5" v-for="appRoute in this.$store.state.appRoutes" :key="appRoute.id">
      <div class="card border-0">
        <div class="card-body">
          <table class="table table-sm">
            <thead>
              <tr id="cardTitle">
                <th scope="col">{{appRoute.title}}</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <i class="fas fa-walking"></i>
                </th>
                <td>{{appRoute.distance}}</td>
                <td></td>
              </tr>

              <tr>
                <th scope="row">
                  <i class="far fa-clock"></i>
                </th>
                <td>{{appRoute.time}}</td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">
                  <i class="fas fa-signal"></i>
                </th>
                <td v-if="appRoute.dif == 'easy'">Fácil</td>
                <td v-if="appRoute.dif == 'medium'">Médio</td>
                <td v-if="appRoute.dif == 'hard'">Difícil</td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">
                  <i class="fas fa-comment"></i>
                </th>
                <td>5</td>
                <td></td>
              </tr>
              <tr>
                <td scope="row"></td>
                <td></td>
                <td>
                  <a
                    href="/percursos/detalhes"
                    class="btn"
                    @click="setCurrentRoute(appRoute.id)"
                    style="background-color: #ffffff;"
                  >
                    <i class="fas fa-plus-circle fa-2x"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- <div class="col-sm-5">
      <div class="card border-0">
        <div class="card-body">
          <table class="table table-sm">
            <thead>
              <tr id="cardTitle">
                <th scope="col">Vila do Conde</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <i class="fas fa-walking"></i>
                </td>
                <td>7 Km</td>
                <td></td>
              </tr>
              <tr>
                <td scope="row">
                  <i class="fas fa-map-marker-alt"></i>
                </td>
                <td>Igreja Matriz, Mosteiro Santa Clara</td>
                <td></td>
              </tr>
              <tr>
                <td scope="row">
                  <i class="far fa-clock"></i>
                </td>
                <td>2h30</td>
                <td></td>
              </tr>
              <tr>
                <td scope="row">
                  <i class="fas fa-signal"></i>
                </td>
                <td>Dificil</td>
                <td></td>
              </tr>
              <tr>
                <td scope="row">
                  <i class="fas fa-star-half-alt"></i>
                </td>
                <td>4.2/5</td>
                <td></td>
              </tr>
              <tr>
                <td scope="row"></td>
                <td></td>
                <td>
                  <a href="#" class="btn" style="background-color: #ffffff;">
                    <i class="fas fa-plus-circle fa-2x"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "landingImage",
  props: {
    msg: String
  },
  data: () => ({
    //curRoute: []
  }),
  methods: {
    setCurrentRoute(id) {
      this.$store.state.currentRoute = id;
      //alert(this.$store.state.currentRoute);
    }
  },
  created: function() {
    //Get path
    this.$store.state.currentPath = window.location.pathname;

    if (localStorage.getItem("appRoutes")) {
      this.$store.state.appRoutes = JSON.parse(
        localStorage.getItem("appRoutes")
      );
    }
  }
};
</script>

<style>
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
</style>