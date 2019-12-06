<template>
  <div class="home">
    <Navbar></Navbar>
    <landingImage></landingImage>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import landingImage from "@/components/landingImage.vue";

export default {
  name: "home",
  components: {
    Navbar,
    landingImage
  }
};
</script>


