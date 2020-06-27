<template>
  <div id="registration">
    <br />
    <br />
    <div id="hidden"></div>
    <div id="formLogin" class="row">
      <div class="col-md-3 col-sm-3 col-xs-2"></div>
      <div class="col-md-6 col-sm-6 col-xs-8" id="formReg">
        <div id="title">
          <h1 id="h1">Registar</h1>
        </div>

        <!-- Default form register -->
        <form id="form" action="#!" v-on:submit.prevent="addUser()">
          <div class="form-row mb-4">
            <div class="col">
              <!-- First name -->
              <input
                id="name"
                type="text"
                v-model="name"
                required
                class="form-control"
                placeholder="Primeiro nome"
              />
            </div>
            <div class="col">
              <!-- Last name -->
              <input
                type="text"
                v-model="lastName"
                required
                id="lastName"
                class="form-control"
                placeholder="Último nome"
              />
            </div>
          </div>

          <!-- E-mail -->
          <input
            type="email"
            v-model="email"
            id="defaultRegisterFormEmail"
            class="form-control mb-4"
            placeholder="E-mail"
          />

          <!-- Password -->
          <input
            type="password"
            v-model="password"
            id="defaultRegisterFormPassword"
            class="form-control"
            placeholder="Password"
            minlength="6"
            required
            aria-describedby="defaultRegisterFormPasswordHelpBlock"
          />
          <small
            id="defaultRegisterFormPasswordHelpBlock"
            class="form-text text-muted mb-4"
          >Mínimo de 6 Caracteres</small>

          <!-- Sign up button -->
          <button id="sign-up" class="btn my-4 btn-block" type="submit">Registar</button>

          <!-- Access log-in page-->
          <button
            class="btn my-4 btn-block"
            value="Login"
            id="login"
            @click="$router.push('login')"
          >Login</button>
        </form>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-2"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert2";
export default {
  name: "Registration",
  data: () => ({
    id: "",
    email: "",
    name: "",
    lastName: "",
    password: "",
    userType: "", //0 = admin, 1 = user normal
    img: ""
  }),
  created: function() {
    this.goToAnchor();
    window.addEventListener("unload", this.saveStorage);
    /* if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    }
    if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );
    } */
  },
  methods: {
    goToAnchor() {
      /* document.body.scrollTop = document.documentElement.scrollTop =
        document.getElementById("center").offsetTop - window.innerHeight / 2; */
    },

    getLastId() {
      return this.$store.getters.lastId;
    },
    addUser() {
      axios
        .post("https://" + this.$store.state.API_ADDRESS + "/users/", {
          firstName: this.name,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.$store.dispatch("getUsers");
          this.APILoginData = response;

          if (response.data == "success") {
            swal.fire("Novo utilizador", "Bem-vindo!", "info").then(value => {
              if (value) {
                this.$store.commit("LOGIN", {
                  email: this.email,
                  password: this.password,
                  firstName: this.name,
                  lastName: this.lastName,
                  userType: 1,
                  isBlocked: 0,
                  avatar: "../assets/avatar.png"
                });
              } else {
                this.$store.commit("LOGIN", {
                  email: this.email,
                  password: this.password,
                  firstName: this.name,
                  lastName: this.lastName,
                  userType: 1,
                  isBlocked: 0,
                  avatar: "../assets/avatar.png"
                });
              }
            });

            /* this.$router.push("/"); */
          } else if (response.data == "email already exists") {
            swal.fire("Aviso", "Este email já está registado", "warning");
          }
        })
        .catch(function(error) {
          alert("erro: " + error);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
<style scoped>
#title {
  text-align: center !important;
  margin: 0 auto;
  position: relative;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  margin-bottom: 5%;
  font-family: "EB Garamond", serif;
}

#h1 {
  margin: 0 auto;
  position: relative;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  padding-right: 0;
  width: 100%;
  font-size: 48px;
  font-family: "EB Garamond", serif;
  color: black;
}

#form {
  background: none;
  border: none;
  margin-bottom: 10%;
}

#formLogin {
  margin: 0 auto;
  vertical-align: center;
}

#formReg {
  margin: 0 auto;
  vertical-align: center;
  margin-bottom: 25%;
  font-size: 14px;
  background-color: white;
  padding: 0%;
  box-shadow: 1px 10px 10px 0px rgba(26, 26, 26, 0.7);
}

#name {
  margin-right: -2px;
}

#lastName {
  margin-left: -2px;
}

#link {
  color: white;
}

h1 {
  margin-right: 50px;
}

#sign-up {
  margin-top: 5%;
  margin: 0 auto;
  background-color: black;
  color: #ffffff;
  height: 40px;
  font-size: 14px;
  width: 60%;
}

#sign-up:hover {
  background-color: rgb(182, 11, 125);
}

#login {
  margin: 0 auto;
  margin-top: 5%;
  background-color: black;
  color: #ffffff;
  height: 40px;
  font-size: 14px;
  width: 60%;
}

#login:hover {
  background-color: rgb(182, 11, 125);
}

input {
  margin: 0 auto;
  height: 40px;
  font-size: 14px;
  width: 60%;
}

#form {
  border: none;
}

#registration {
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

@media only screen and (max-width: 560px) {
  #hidden {
    margin-bottom: 40%;
  }
}
</style>