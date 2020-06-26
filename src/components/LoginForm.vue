<template>
  <div id="app">
    <div id="hidden"></div>
    <div class="row">
      <div class="col-md-3 col-sm-2 col-xs-3"></div>
      <div class="col-md-6 col-sm-8 col-xs-6" id="formLogin">
        <div id="titleDiv">
          <h1 id="title" class="display-4">Login</h1>
        </div>

        <!-- Default form login -->
        <!-- <form class="text-center" action="#!" v-on:submit.prevent="login()"> -->
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
        <button
          squared
          class="btn my-4 btn-block"
          value="reg"
          id="reg"
          @click="$router.push('registar')"
        >Registar</button>
        <!-- </form> -->
        <!-- Default form login -->
      </div>
      <div class="col-md-3 col-sm-2 col-xs-3"></div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import swal from "sweetalert2";
/* import router from './router'; */
export default {
  name: "LoginForm",
  data: () => ({
    emailLogin: "",
    passwordLogin: "",
    test: [],
    show: true,
    APILoginData: [] /* ,,
    input: this.$refs.email */
  }),
  created: function() {
    if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    }
    /* if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );
    } */
  },

  mounted: function() {
    this.focusInput();
    this.$store.dispatch("getUsers");
  },
  methods: {
    login() {
      axios
        .post("http://" + this.$store.state.API_ADDRESS + "/login/", {
          email: this.emailLogin,
          password: this.passwordLogin,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.APILoginData = response;
          if (response.data == "login successful") {
            swal.fire("Login", "Bem-vindo!", "info");

            this.$store.commit("LOGIN", {
              email: this.emailLogin,
              password: this.passwordLogin
            });

            if (this.$store.state.currentUser[0].userType === 0) {
              this.$router.push("admin");
            } else if (this.$store.state.currentUser[0].userType === 1) {
              this.$router.push("/");
            }

            /* alert(this.$store.state.currentUser[0].userType) */
          } else if (response.data == "user blocked") {
            swal.fire(
              "Erro",
              "Esta conta está bloqueada. Por favor contacte a administração.",
              "warning"
            );
          } else if (response.data == "wrong password") {
            swal.fire("Erro", "Credenciais incorretas", "warning");
          }
          /* commit("LOGIN", APILoginData); */
        })
        .catch(function(error) {
          alert("erro: " + error);
        })
        .finally(() => (this.loading = false));
    },

    logout() {
      this.$store.commit("LOGOUT", {
        email: this.emailLogin
      });
    },

    focusInput() {
      this.$refs.email.focus();
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
  margin-bottom: 25%;
  font-size: 14px;
  background-color: white;
  box-shadow: 1px 10px 10px 0px rgba(92, 92, 92, 0.7);
  padding: 0%;
  position: relative;
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
  background-color: rgb(182, 11, 125);
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
  background-color: rgb(182, 11, 125);
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

form {
  margin-bottom: 50px;
}

#app {
  background: linear-gradient(
    180deg,
    rgba(134, 26, 98, 0.8) 0%,
    rgba(216, 152, 68, 1) 100%
  );
}

#hidden {
  margin-bottom: 20%;
  display: inline-block;
}

@media only screen and (max-width: 600px) {
  #hidden {
    margin-bottom: 40%;
  }
}
</style>