<template>
  <div>
    <div id="titulo" class="row">
      <div class="container">
        <h1 class="display-3">Perfil</h1>
      </div>
    </div>
    <div id="formImage" class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <img src="../assets/avatar.png" alt="Avatar" width="160" height="160" />
        <InfoPerfil id="info" />
      </div>
    </div>
    <div id="formLogin" class="row" v-for="user in this.$store.state.currentUser" :key="user.id">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <!-- Default form register -->

        <h2>Alterar dados</h2>
        <form class="text-center border border-light p-5" action="#!" >
          <div class="form-row mb-4" >
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
            class="btn my-4 btn-block btn-lg"
            style="background-color: #671919; color : #ffffff"
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
#titulo {
  text-align: center;
  margin-bottom: 0%;
}
#info {
  margin-top: 4%;
  margin-bottom: 4%;
}
</style>