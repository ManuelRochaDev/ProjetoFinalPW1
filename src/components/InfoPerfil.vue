<template>
  <!--Navbar-->
  <div class="row">
    <div class="container">
      <h4 v-if="this.$store.state.currentUser.length != 0">Nome: {{getName()}} {{getLastName()}}</h4>
      <h4 v-if="this.$store.state.currentUser.length != 0">Email: {{getEmail()}}</h4>
      <h4 v-if="this.$store.state.currentUser.length != 0">Tipo de user: {{getUsertype()}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPerfil",

  created: function() {
    if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );
    }
  },
  methods: {
    getName() {
      return this.$store.getters.name;
    },
    getLastName() {
      return this.$store.getters.lastName;
    },
    getEmail() {
      return this.$store.getters.email;
    },
    getUsertype() {
      let userType = this.$store.getters.userType;
      if (userType == 0) {
        return "Administador";
      } else {
        return "Normal";
      }
    }
  }
};
</script>