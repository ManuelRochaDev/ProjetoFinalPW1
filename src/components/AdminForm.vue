<template>
  <div id="routeDiv">
    Título:
    <input type="text" name="title" id="routeTitle" v-model="title" />
    <br />
    <br />Cidade:
    <input type="text" name="city" id="routeCity" v-model="city" />
    <br />
    <br />Pontos de interesse:

    <button name="addText" id="addText" role="button" @click="createRoute()">Adicionar novo</button>
    <br />
    <form v-on:submit.prevent="addRoute()">
      <button name="addText" id="addText" role="button">Adicionar Percurso</button>
      <br />
      <br />
    </form>
  </div>
</template>

<script>
let idRoute = 0;

export default {
  name: "AdminForm",
  props: {
    msg: String
  },
  created: function() {
    window.addEventListener("unload", this.saveStorage);
    if (localStorage.getItem("appRoutes")) {
      this.$store.state.appRoutes = JSON.parse(
        localStorage.getItem("appRoutes")
      );
    }
  },
  methods: {
    createRoute() {
      idRoute++;
      let rDiv = document.getElementById("routeDiv");

      let textBox = document.createElement("input");
      textBox.setAttribute("type", "text");
      //textBox.setAttribute("v-model", "pointTextbox" + idRoute);
      textBox.id = "pointTextbox" + idRoute;
      rDiv.appendChild(textBox);

      //X
      let btn = document.createElement("BUTTON");
      btn.innerHTML = "X";
      rDiv.appendChild(btn);

      //ORGANIZAÇÃO
      let br = document.createElement("br");
      rDiv.appendChild(br);
      let br2 = document.createElement("br");
      rDiv.appendChild(br2);
    },
    getLastRouteId() {
      return this.$store.getters.lastRouteId;
    },
    addRoute() {
      let interestPoints = [];
      let textBox2

      for (let i = 1; i < idRoute + 1; i++) {
        textBox2 = "pointTextbox" + i
        interestPoints.push(document.getElementById(textBox2).value)
      }

      this.$store.commit("ADD_ROUTE", {
        id: this.getLastRouteId() + 1,
        title: this.title,
        city: this.city,
        interestPoints: interestPoints
      });
    },
    saveStorage() {
      localStorage.setItem(
        "appRoutes",
        JSON.stringify(this.$store.state.appRoutes)
      );
    }
  },
  mounted() {
    this.createRoute();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>