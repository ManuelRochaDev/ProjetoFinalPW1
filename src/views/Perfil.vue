<template>
  <div class="container">
    <div class="details">
      <div class="row">
        <div class="col-md-2 col-lg-2"></div>
        <div class="col-md-3 col-lg-3 col-sm-12">
          <img
            class="img-responsive image-resize"
            id="img"
            src="../assets/random_dude.png"
            alt="Avatar"
          />
        </div>
          <InfoPerfil id="info" />
      </div>
    </div>

    <div class="row" v-for="user in this.$store.state.currentUser" :key="user.id" id="change">
      <div class="col-sm-2"></div>
      <div class="col-sm-8" id="dados">
        <!-- Default form register -->

        <h2 id="titDados">Alterar dados</h2>
        <form class="text-center border border-light p-5" action="#!">
          <div id="formDiv" class="form-row mb-4">
            <div class="col">
              <!-- First name -->
              <input
                type="text"
                v-model="user.name"
                class="form-control"
                placeholder="Primeiro nome"
              />
            </div>
            <div class="col">
              <!-- Last name -->
              <input
                type="text"
                id="defaultRegisterFormLastName"
                v-model="user.lastName"
                class="form-control"
                placeholder="Último nome"
              />
            </div>
          </div>

          <!-- E-mail -->
          <input
            type="email"
            id="defaultRegisterFormEmail"
            v-model="user.email"
            class="form-control mb-4"
            placeholder="E-mail"
          />

          <!-- Password -->
          <input
            type="password"
            id="defaultRegisterFormPassword"
            class="form-control"
            v-model="user.password"
            placeholder="Nova password"
            aria-describedby="defaultRegisterFormPasswordHelpBlock"
          />
          <small
            id="defaultRegisterFormPasswordHelpBlock"
            class="form-text text-muted mb-4"
          >8 Caracteres e 1 número</small>

          <!-- Sign up button -->

          <hr />
          <button
            id="guardar"
            class="btn my-4 btn-block btn-lg"
            type="submit"
            @click="newInfo(user.id)"
          >Guardar</button>
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
    if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
        
      );
    }
    this.$store.state.currentPath = window.location.pathname;
  },
  components: {
    InfoPerfil
  },
  methods: {
    newInfo(userId) {
      if (confirm("Tem a certeza que quer mudar os dados?")) {
        this.$store.commit("CHANGE_USER", {
          id: userId,
          newFirstName: this.name,
          newLastName: this.lastName,
          newEmail: this.email,
          newPassword: this.password
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin: auto;
  text-align: center;
  width: 70%;
  margin-top: 2%;
  margin-bottom: 5%;
  padding-right: 0%;
  padding-left: 0%;
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.1);
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
  margin: auto 0px auto 0px;
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
  box-shadow: 0px 0px 4px 2px rgb(105, 200, 105);
  filter: blur();
}

#info {
  margin: auto 2% auto 10px;

  border: none;
  width: 45%;
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
</style>