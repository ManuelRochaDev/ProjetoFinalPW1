<template>
  <div class="home">
    <landingImage></landingImage>
  </div>
</template>

<script>
// @ is an alias to /src
import landingImage from "@/components/landingImage.vue";

export default {
  name: "home",
  components: {
    landingImage
  },
  created: function() {
    /* window.addEventListener("unload", this.saveStorage);
    if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    }
    if (localStorage.getItem("currentUser")) {
      this.$store.state.currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );
    } */
    this.$store.state.path = window.location.pathname
  },
  methods: {

  }
};
</script>


