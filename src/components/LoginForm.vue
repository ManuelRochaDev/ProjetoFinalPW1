<template>
  <div id="app">
    <div class="row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4" id="formLogin">
        <div id="titleDiv">
          <h1 id="title" class="display-4">Login</h1>
        </div>

        <!-- Default form login -->
        <form class="text-center" action="#!" v-on:submit.prevent="login()">
          <!-- Email -->
          <input
            type="email"
            v-model="emailLogin"
            required
            id="defaultLoginFormEmail"
            class="form-control mb-4"
            ref="email"
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
          <button id="logIn" class="btn btn-block my-4" type="submit" @click="login()">Entrar</button>

          <!-- Register -->
          <button id="reg" class="btn btn-block my-4" squared>
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
      } else {
        swal("Log-in", "Esta conta está bloqueada. Por favor contacte a administração.", "error")
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
#app {
  width: 100%;
}

#formLogin {
  margin: 0 auto;
  vertical-align: center;
  margin-top: 15%;
  margin-bottom: 12%;
  font-size: 14px;
  background-color: white;
  box-shadow: 1px 10px 10px 0px rgba(92,92,92,0.7);
  padding: 0%;
}

#title {
  margin: 0 auto;
  position: relative;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-right: 0;
  width: 100%;
  font-size: 48px;
  font-family: "EB Garamond", serif;
  color: black;
}

#titleDiv {
  position: relative;
  width: 100%;
  padding-bottom: 5%;
}

h1 {
  padding-right: 50px;
}

#link {
  color: white;
}

#reg {
  margin: 0 auto;
  background-color: black;
  color: white;
  height: 40px;
  font-size: 14px;
  width: 60%;
}

#reg:hover {
  background-color: rgb(216, 152, 68);
}

#logIn {
  margin: 0 auto;
  background-color: black;
  color: white;
  height: 40px;
  font-size: 14px;
  width: 60%;
}

#logIn:hover {
  background-color: #d89844;
}

input {
  margin: 0 auto;
  height: 40px;
  font-size: 14px;
  padding-right: 5%;
  padding-left: 5%;
  width: 60%;
  background-color: white;
}

form{
  margin-bottom: 50px;
}

#app{
  background: linear-gradient(180deg, rgba(134,26,98,0.8) 0%,  rgba(216,152,68,1) 100%);
}


</style>