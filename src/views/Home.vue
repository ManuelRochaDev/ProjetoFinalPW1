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
    this.$store.state.path = window.location.pathname
  },
  methods: {

  }
};
</script>


