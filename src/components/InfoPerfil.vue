<template>
  <!--Navbar-->
  <div class="container" id="contain">
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-12">
        <h2
          id="name"
          v-if="this.$store.state.currentUser.length != 0"
        >{{getName()}} {{getLastName()}}</h2>
        <h2 id="email" v-if="this.$store.state.currentUser.length != 0">Email: {{getEmail()}}</h2>
        <h2
          id="type"
          v-if="this.$store.state.currentUser.length != 0"
        >Tipo de utilizador: {{getUsertype()}}</h2>
      </div>
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

<style scoped>
#name {
  font-size: 32px;
  padding-bottom: 2%;
  padding-top: 4%;
  font-family: "EB Garamond", serif;
}

#email,
#type {
  font-size: 16px;
  font-family: "Catamaran", sans-serif;
}

</style>