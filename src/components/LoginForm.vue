<template>
  <div id="app">
    <div id="formLogin" class="row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
        <!-- Default form login -->
        <form class="text-center border border-light p-5" action="#!" v-on:submit.prevent="login()">
          <h1>Login</h1>

          <!-- Email -->
          <input
            type="email"
            v-model="emailLogin"
            required
            id="defaultLoginFormEmail"
            class="form-control mb-4"
            placeholder="E-mail"
          />

          <!-- Password -->
          <input
            type="password"
            v-model="passwordLogin"
            required
            id="defaultLoginFormPassword"
            class="form-control mb-4"
            placeholder="Password"
          />

          <div class="d-flex justify-content-around">
            <div>
              <!-- Remember me -->
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember" />
                <label class="custom-control-label" for="defaultLoginFormRemember">Lembrar</label>
              </div>
            </div>
          </div>

          <!-- Sign in button -->
          <button id="logIn" class="btn btn-block my-4" style="background-color: #671919;" type="submit">Entrar</button>

          <!-- Register -->
          <button  class="btn btn-block my-4" style="background-color: #671919;" squared>
            <router-link id="link" to="/registar">Registar</router-link>
          </button>
        </form>
        <!-- Default form login -->
      </div>
      <div class="col-sm-4"></div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
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
    if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );
    }
  },
  methods: {
    login() {
      if (this.$store.state.users.isBlocked !== 1) {
        this.$store.commit("LOGIN", {
          email: this.emailLogin,
          password: this.passwordLogin
        });
      } else{
        swal("Está blockeado de entrar no website")
      }
    },

    logout() {
      this.$store.commit("LOGOUT", {
        email: this.emailLogin
      });
    }
  }
};
</script>

<style scoped>
h1{
  padding-right:50px
}

#link{
  color:white;
}
#logIn{
  color:white;
}
</style>