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
  methods: {
    /* register(){
      this.$store.commit("REGISTER_USER", payload)
    } */
  }
};
</script>


