<template>
  <!--Navbar-->
  <div>
    <h2 v-if="this.$store.state.currentUser.length != 0">Nome: {{getName()}} {{getLastName()}}</h2>
    <h2 v-if="this.$store.state.currentUser.length != 0">Email: {{getEmail()}}</h2>
    <h2 v-if="this.$store.state.currentUser.length != 0">Tipo de utilizador: {{getUsertype()}}</h2>
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
    },

  }
};
</script>