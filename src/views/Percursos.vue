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
      localStorage.setItem("currentRoute", JSON.stringify(this.$store.state.appRoutes[id]))
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
  align-items: center;
  margin:inherit
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

.container{
  position: relative;
  align-items: center;
  margin-left: 20%; 
}


h1{
  text-align: center;
  align-items: center;
  align-self: center;
  align-content: center;
  margin-left: 13%
}
</style>