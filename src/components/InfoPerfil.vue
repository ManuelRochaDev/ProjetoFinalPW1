<template>
  <!--Navbar-->
  <div>
    <h1>Nome:</h1>
    <h1>Último Nome:</h1>
    <h1>Email:</h1>
    <h1>Usertype:</h1>
  </div>
</template>

<script>
export default {
  name: "InfoPerfil",
  data: () => ({
    id: "",
    email: "",
    name: "",
    lastName: "",
    password: "",
    usertype: "" //0 = admin, 1 = user normal
  }),
  created: function() {
    window.addEventListener("unload", this.saveStorage);
    if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    }
    if (localStorage.getItem("currentUserID")) {
      this.$store.state.currentUserID = JSON.parse(
        localStorage.getItem("currentUserID")
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
        usertype: 1
      });
    },
    saveStorage() {
      localStorage.setItem("users", JSON.stringify(this.$store.state.users));
      localStorage.setItem(
        "currentUserID",
        JSON.stringify(this.$store.state.currentUserID)
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-default {
  background-color: #fffded;
}

.navbar-nav > li {
  padding-left: 45px;
  padding-right: 45px;
}

.srcIcon {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 12%;
}
</style>