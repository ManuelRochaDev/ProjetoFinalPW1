<template>
  <div id="routeDiv">
    Título:
    <input type="text" name="title" id="routeTitle" v-model="title" />
    <br />
    <br />Cidade:
    <input type="text" name="city" id="routeCity" v-model="city" />
    <br />
    <br />Pontos de interesse:
    <button
      name="addText"
      id="addText"
      role="button"
      @click="addTextbox()"
    >Adicionar novo</button>
    <br />
    <p v-for="poi in pois" :key="poi.id">
      <input type="text" v-model="poi.name" />
    </p>
    <pre>
      {{this.pois}}
    </pre>

    <form v-on:submit.prevent="addRoute()">
      <button name="addText" id="addText" role="button">Adicionar Percurso</button>
      <br />
      <br />
    </form>
  </div>
</template>

<script>
/* let idRoute = 0; */

export default {
  name: "AdminForm",
  props: {
    msg: String
  },
  data: () => ({
    pois: [],
    idTextbox: 0
  }),
  created: function() {
    window.addEventListener("unload", this.saveStorage);
    if (localStorage.getItem("appRoutes")) {
      this.$store.state.appRoutes = JSON.parse(
        localStorage.getItem("appRoutes")
      );
    }
  },
  methods: {
    addTextbox() {
      this.idTextbox++
      this.pois.push({id: this.idTextbox, name: ""})
    },
    getLastRouteId() {
      return this.$store.getters.lastRouteId;
    },
    addRoute() {
      this.$store.commit("ADD_ROUTE", {
        id: this.getLastRouteId() + 1,
        title: this.title,
        city: this.city,
        pois: this.pois
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
    this.addTextbox();
      }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>