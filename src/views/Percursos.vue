<template>
  <div id="body">
    <h1 id="title" class="display-4">Percursos</h1>
    <div id="routeCont" class="container">
      <div class="row">
        <div id="cards" class="card-deck">
          <div
            id="cardCol"
            class="col-sm-12 col-md-4"
            v-for="appRoute in this.$store.state.appRoutes"
            :key="appRoute.id"
          >
            <div class="card" data-tilt data-tilt-axis="x" data-tilt-max="5" data-tilt-speed="100">
              <div class="card-body">
                <table class="table table-sm" cellspacing="0" cellpadding="0">
                  <thead>
                    <tr>
                      <th scope="col" id="cardTitle">{{appRoute.title}}</th>
                    </tr>
                  </thead>
                  <tbody id="tbody">
                    <tr>
                      <th>
                        <pre class="tab"><i class="fas fa-walking"></i>  Distância</pre>
                      </th>
                      <td>{{appRoute.distance}}</td>
                    </tr>

                    <tr>
                      <th>
                        <pre class="tab"><i class="fas fa-clock"></i>  Duração</pre>
                      </th>
                      <td>{{appRoute.time}}</td>
                    </tr>
                    <tr>
                      <th>
                        <pre class="tab"><i class="fas fa-signal"></i> Dificuldade</pre>
                      </th>
                      <td v-if="appRoute.dif == 'easy'">Fácil</td>
                      <td v-else-if="appRoute.dif == 'medium'">Médio</td>
                      <td v-else-if="appRoute.dif == 'hard'">Difícil</td>
                    </tr>
                    <tr>
                      <th>
                        <pre class="tab"><i class="fas fa-comment"></i>  Comentários</pre>
                      </th>
                      <td>5</td>
                    </tr>
                    <tr>
                      <th></th>
                      <td>
                        <span>
                          <a
                            href="/percursos/detalhes"
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Mais info"
                            class="btn"
                            id="moreInf"
                            @click="setCurrentRoute(appRoute.id)"
                          >
                            <i id="infIcon" class="fas fa-plus-circle fa-3x"></i>
                          </a>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--linha no fim do card
            
                <hr>-->
              </div>
            </div>
          </div>
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

  }),
  methods: {
    setCurrentRoute(id) {
      localStorage.setItem(
        "currentRoute",
        JSON.stringify(this.$store.state.appRoutes[id])
      );
    },
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
#title {
  margin: 0 auto;
  position: relative;
  justify-content: center;
  margin-top: 12%;
  font-size: 48px;
  color: rgb(255, 192, 109);
}

.tab {
  tab-size: 2;
}

body {
  background: linear-gradient(
    180deg,
    rgba(134, 26, 98, 1) 0%,
    rgba(216, 152, 68, 1) 100%
  );
}

pre {
  font-family: "Catamaran", sans-serif;
  font-size: 14px;
  overflow: hidden;
}

.fas {
  color: rgba(134, 26, 98, 0.8);
}

img {
  width: 100%;
  height: 15vw;
  /*transform: translateY(-10px);
    border-radius: 4% 4% 4% 4%;
    box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.3);*/
}

i {
  margin-left: 30px;
}

table,
tr,
td,
th {
  border: none !important;
  border-collapse: collapse;
}

table table-sm {
  border: none !important;
}

thead {
  margin: 0 auto;
  font-size: 18px;
  color: rgb(216, 152, 68);
}

table {
  margin-bottom: 0px;
  padding-bottom: 0px;
}

span {
  margin-right: 20px;
  float: right;
  text-align: right;
}

#cards {
  position: relative;
  margin: 0 auto;
  margin-top: 2%;
  text-align: left;
}

#cardCol {
  margin-bottom: 20px;
}

.card {
  height: 95%;
  box-shadow: 0px 8px 12px 0px rgba(10, 10, 0, 0.2);
  overflow: hidden;
  margin-top: 20px;
}

.card-text {
  margin: 0 auto;
  position: relative;
  text-align: left;
}

.card-body {
  overflow-x: auto;
}

#cardTitle {
  padding-bottom: 20px;
  font-weight: bold;
}

#routeCont {
  margin: 0 auto;
  margin-bottom: 5%;
  width: 80%;
}

#moreInf {
  color: black;
  text-align: right;
  justify-content: right;
  position: relative;
  margin-right: -20px !important;
}

#moreInf:hover {
  color: rgba(134, 26, 98, 0.8);
}

#infIcon {
  color: black;
}

#infIcon:hover {
  color: rgba(134, 26, 98, 0.8);
}

@media only screen and (max-width: 600px) {
}

#body {
  font-size: 16px;
}

.tooltip-inner {
  margin: 0 auto;
  text-align: center;
  justify-content: center;
  font-size: 12px;
  min-height: 20px;
  min-width: 120px; /* the minimum width */
}
</style>