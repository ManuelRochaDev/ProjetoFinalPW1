<template>
  <div id="loginform">
    <br />
    <br />

    <h1 id="redTitle">LOGIN</h1>
    <hr class="back-line" />

    <br />

    <div class="container col-sm-4">
      <form v-on:submit.prevent="login()" v-if="show">
        <form id="input-group-1">
          <label for="input-1">Email:</label>
          <input
            id="input-1"
            v-model="emailLogin"
            type="email"
            required
            placeholder="Introduzir email"
          />
        </form>

        <form id="input-group-4">
          <label for="input-4">Password:</label>
          <input
            id="input-4"
            v-model="passwordLogin"
            type="password"
            required
            placeholder="Introduzir password"
          />
        </form>

        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <button id="show-btn" squared>
                <router-link id="link" to="/registar">Registar</router-link>
              </button>
            </div>
            <div class="col-sm-6">
              <button type="submit" id="show-btn" squared>Confirmar</button>
            </div>
          </div>
        </div>
      </form>

      <form v-on:submit.prevent="logout()" v-if="show">
            <div class="col-sm-6">
              <button type="submit" id="logout-btn" squared>Logout</button>
            </div>
      </form>




    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data: () => ({
    emailLogin: "",
    passwordLogin: "",
    show: true
  }),
  created: function() {
    //qd abres esta pagina vai acontecer isto
    if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    }
    if (localStorage.getItem("currentUserID")) {
      this.$store.state.currentUserID = JSON.parse(
        localStorage.getItem("currentUserID")
      );
    }
  },
  methods: {
    login() {
      this.$store.commit("LOGIN", {
        email: this.emailLogin,
        password: this.passwordLogin
      })
    },
    
    logout() {
      this.$store.commit("LOGOUT", {
        email: this.emailLogin
      })
    }
  }
};
</script>

<style scoped>
</style>