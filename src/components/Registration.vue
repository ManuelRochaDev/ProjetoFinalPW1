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
    usertype: "" //0 = admin, 1 = user normal
  }),
  created: function() {
    window.addEventListener("unload", this.saveStorage)
    if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"))
    }
    if (localStorage.getItem("currentUserID")) {
      this.$store.state.currentUserID = JSON.parse(localStorage.getItem("currentUserID"))
    }
  },
  methods: {
    getLastId() {
      return this.$store.getters.lastId
    },
    addUser() {
      this.$store.commit("REGISTER_USER", {
        id: this.getLastId() + 1,
        email: this.email,
        name: this.name,
        lastName: this.lastName,
        password: this.password,
        usertype: 1
      });
    },
    saveStorage() {
      localStorage.setItem("users", JSON.stringify(this.$store.state.users));
      localStorage.setItem("currentUserID", JSON.stringify(this.$store.state.currentUserID));
    }
  }
};
</script>


<style scoped>
/* .input {
        padding: 5px;
    }

    #link {
        color: white;
    }

    #redTitle {
        font-family: "bookMan";
        font-size: 45px;
        color: #B91C3B;
    }

    label {
        float: left;
        margin-bottom: .5rem;
    }

    .back-line {
        background-color: #0A2463;
        margin-top: -10px;
        width: 600px;


    } */
</style>