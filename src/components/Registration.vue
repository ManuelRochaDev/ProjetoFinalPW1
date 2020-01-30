<template>
  <div id="registration">
    <br />
    <br />
    <h1 id="redTitle">REGISTO</h1>
    <hr class="back-line" />
    <div class="container col-sm-6">
      <form v-on:submit.prevent="addUser()">
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <form class="input">
                <label for="input-2">Nome Próprio:</label>
                <input id="input-2" v-model="name" required placeholder="Introduzir nome" />
              </form>
            </div>
            <div class="col-sm-6">
              <form class="input" id="input-group-6">
                <label for="input-6">Apelido:</label>
                <input id="input-6" v-model="lastName" required placeholder="Introduzir apelido" />
              </form>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <form class="input" id="input-group-1">
                <label for="input-1">Email:</label>
                <input
                  id="input-1"
                  v-model="email"
                  type="email"
                  required
                  placeholder="Introduzir email"
                />
              </form>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <form class="input" id="input-group-4">
                <label for="input-4">Password:</label>
                <input
                  id="input-4"
                  v-model="password"
                  type="password"
                  required
                  placeholder="Introduzir password"
                />
              </form>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <button id="show-btn" squared>
                <router-link id="link" to="/login">Login</router-link>
              </button>
            </div>
            <div class="col-sm-6">
              <button type="submit" id="show-btn" squared>Confirmar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registration",
  data: () => ({
    id: "",
    email: "",
    name: "",
    lastName: "",
    password: "",
    userType: "" //0 = admin, 1 = user normal
  }),
  created: function() {
    window.addEventListener("unload", this.saveStorage);
    if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    }
    if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );
    }
  },
  methods: {
    getLastId() {
      return this.$store.getters.lastId;
    },
    addUser() {
      this.$store.commit("REGISTER_USER", {
        id: this.getLastId() + 1,
        email: this.email,
        name: this.name,
        lastName: this.lastName,
        password: this.password,
        userType: 1,
        isBlocked: 0
      });
    },
    saveStorage() {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(this.$store.state.currentUser)
      );
    }
  }
};
</script>


<style scoped>

</style>