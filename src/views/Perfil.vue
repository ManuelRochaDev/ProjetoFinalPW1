<template>
  <div class="container">
    <div class="details">
      <div class="row">
        <div class="col-md-2 col-lg-2 col-sm-12"></div>
        <div
          class="col-md-3 col-lg-3 col-sm-12"
          v-if="this.$store.state.currentUser.avatar != null"
        >
          <img
            class="img-responsive image-resize"
            id="img"
            :src="this.$store.state.currentUser.avatar"
            alt="Avatar"
          />
        </div>
        <div v-else class="col-md-3 col-lg-3 col-sm-12">
          <img class="img-responsive image-resize" id="img" src="../assets/avatar.png" alt="Avatar" />
        </div>
        <div class="col-md-7 col-lg-7 col-sm-12">
          <InfoPerfil id="info" />
        </div>
      </div>
    </div>

    <div class="row" v-for="user in this.$store.state.currentUser" :key="user.id" id="change">
      <div class="col-md-2 col-sm-2 col-xs-2"></div>
      <div class="col-md-8 col-sm-8 col-xs-8" id="dados">
        <!-- Default form register -->

        <h2 id="titDados">Alterar dados</h2>
        <form class="text-center border border-light p-5" action="#!">
          <div id="formDiv" class="form-row mb-4">
            <div class="col">
              <!-- First name -->
              <input type="text" v-model="name" class="form-control" :placeholder="user.name" />
            </div>
            <div class="col">
              <!-- Last name -->
              <input
                type="text"
                id="defaultRegisterFormLastName"
                v-model="lastName"
                class="form-control"
                :placeholder="user.lastName"
              />
            </div>
          </div>

          <!-- E-mail -->
          <input
            type="email"
            id="defaultRegisterFormEmail"
            v-model="email"
            class="form-control mb-4"
            :placeholder="user.email"
          />

          <!-- Sign up button -->

          <hr />
          <button
            id="guardar"
            class="btn my-4 btn-block btn-lg"
            type="submit"
            @click="newInfo(user.id_user)"
          >Guardar</button>
        </form>
      </div>
      <div class="col-sm-2"></div>
    </div>

    <!-- DISTANCIAMENTO SOCIAL -->

    <div class="row" v-for="user in this.$store.state.currentUser" :key="user.id" id="change">
      <div class="col-md-2 col-sm-2 col-xs-2"></div>
      <div class="col-md-8 col-sm-8 col-xs-8" id="dados">
        <!-- Default form register -->

        <h2 id="titDados">Alterar password</h2>
        <form class="text-center border border-light p-5" action="#!">
          <!-- Password -->
          <input
            type="password"
            id="defaultRegisterFormPassword"
            class="form-control"
            v-model="password"
            placeholder="Nova password"
            aria-describedby="defaultRegisterFormPasswordHelpBlock"
          />
          <small
            id="defaultRegisterFormPasswordHelpBlock"
            class="form-text text-muted mb-4"
          >Mínimo de 6 Caracteres</small>

          <!-- Sign up button -->

          <hr />
          <button
            id="guardar"
            class="btn my-4 btn-block btn-lg"
            type="submit"
            @click="newPassword(user.id_user)"
          >Alterar</button>
        </form>
      </div>
      <div class="col-sm-2"></div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import InfoPerfil from "../components/InfoPerfil.vue";
import axios from "axios";
import swal from "sweetalert2";
export default {
  name: "Perfil",
  data: () => ({
    name: "",
    email: "",
    password: "",
    lastName: ""
  }),
  created() {
    //qd abres esta pagina vai acontecer isto
    /* if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );
    } */
    this.$store.state.currentPath = window.location.pathname;
    window.scrollTo(0, 0);
  },
  components: {
    InfoPerfil
  },
  methods: {
    newInfo(userId) {
      if (this.name == "") {
        this.name = this.$store.state.currentUser[0].name
      }
      if (this.email == "") {
        this.email = this.$store.state.currentUser[0].email
      }
      if (this.lastName == "") {
        this.lastName = this.$store.state.currentUser[0].lastName
      }
      axios
        .put("http://" + this.$store.state.API_ADDRESS + "/users/" + userId, {
          id_user: userId,
          name: this.name,
          email: this.email,
          lastName: this.lastName,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.APILoginData = response;
          if (response.data == "success") {
            swal.fire("Atualização", "Conta atualizada com sucesso", "info");
          }
          if (response.data == "empty field") {
            swal.fire("Erro", "Algum campo está vazio!", "warning");
          }
        })
        .catch(function() {
          swal.fire("Erro", "erro", "warning");
        });
    },
    newPassword(userId) {
      axios
        .put(
          "http://" +
            this.$store.state.API_ADDRESS +
            "/users/updatepassword/" +
            userId,
          {
            id_user: userId,
            password: this.password,
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(swal.fire("Sucesso", "Password alterada", "info"))
        .catch(function() {
          swal.fire("Erro", "erro", "warning");
        });
    }
  }
};
</script>

<style scoped>
.container {
  margin: auto;
  text-align: center;
  width: 70%;
  margin-top: 15%;
  margin-bottom: 5%;
  padding-right: 0%;
  padding-left: 0%;
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.1);
  background: white;
}

#perfil {
  margin: 0 auto;
  position: relative;
  text-align: center;
  color: #221d23;
  padding: 20px 0px 20px 0px;
  font-size: 48px;
}

.details {
  margin: 0 auto;
  padding-top: 4%;
  padding-bottom: 4%;
  padding-right: 0px;
  padding-left: 0px;
  margin-bottom: 4%;
  background-color: rgb(216, 152, 68);
  box-shadow: none;
  background-size: 100% 100%;
}

/*.raw {
  margin:auto;

}*/

#img {
  margin: 0 auto;
  width: 150px;
  max-width: 150px;
  min-width: 75px;
  transition: 0.3s ease;
  align-content: center;
  cursor: pointer;
  display: block;
}

#img:hover {
  transform: scale(1.1, 1.1);
  filter: blur();
}

#info {
  margin: 0 auto;
  margin-top: 4%;
  margin-right: 35%;
  border: none;
  width: 60%;
  color: white;
  background-color: #221d23;
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.1);
  justify-content: flex-start;
}

#titDados {
  color: black;
}

h1 {
  color: white;
}

h2 {
  color: white;
}

form {
  width: 100%;
}

input {
  height: 40px;
  font-size: 14px;
}

button {
  height: 40px;
}

#guardar {
  font-size: 14px;
  background-color: #221d23;
  color: #ffffff;
}

#guardar:hover {
  background-color: rgb(153, 24, 110);
}

@media only screen and (max-width: 768px) {
  .container {
    margin: auto;
    text-align: center;
    width: 70%;
    margin-top: 30%;
    margin-bottom: 5%;
    padding-right: 0%;
    padding-left: 0%;
    box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.1);
    background: white;
  }

  #img {
    margin: 0 auto;

    width: 150px;
    max-width: 150px;
    min-width: 75px;
    transition: 0.3s ease;
    align-content: center;
    cursor: pointer;
    display: block;
  }

  #info {
    margin: 0 auto;
    margin-top: 4%;
    border: none;
    width: 80%;
    color: white;
    background-color: #221d23;
    box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.1);
    justify-content: flex-start;
  }
}
</style>