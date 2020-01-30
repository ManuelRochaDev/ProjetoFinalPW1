<template>
  <div id="registration">
    <br />
    <br />
    <div id="formLogin" class="row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
        <!-- Default form register -->
        <form
          class="text-center border border-light p-5"
          action="#!"
          v-on:submit.prevent="addUser()"
        >
          <h1>Registar</h1>

          <div class="form-row mb-4">
            <div class="col">
              <!-- First name -->
              <input
                type="text"
                v-model="name"
                required
                id="defaultRegisterFormFirstName"
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
                id="defaultRegisterFormLastName"
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
          >8 Caracteres e 1 número</small>

          <!-- Sign up button -->
          <button
            class="btn my-4 btn-block"
            style="background-color: #671919; color: #ffffff"
            type="submit"
          >Registar</button>

          <!-- Access log-in page-->
          <button class="btn my-4 btn-block" style="background-color: #671919; color: #ffffff">
            <router-link id="link" to="/login">Login</router-link>
          </button>

          <hr />
        </form>
      </div>
      <div class="col-sm-4"></div>
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
    userType: "", //0 = admin, 1 = user normal
    img: ""
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
        isBlocked: 0,
        img: "../assets/avatar.png"
      });
    },

    saveStorage() {
      //localStorage.setItem("users", JSON.stringify(this.$store.state.users));
      localStorage.setItem(
        "currentUser",
        JSON.stringify(this.$store.state.currentUser)
      );
    }
  }
};
</script>

<style scoped>
#link{
  color:white;
}

h1{
  margin-right:50px
}
</style>