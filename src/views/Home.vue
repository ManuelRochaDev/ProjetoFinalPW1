<template>
  <div class="home">
    <Navbar></Navbar>
    <input type="text" placeholder="User" id="userField">    
    <input type="password" placeholder="Password" id="pwField">
    <input type="button" value="REGISTAR" id="registerButton">
    <!-- <landingImage></landingImage> -->
    
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
//import landingImage from "@/components/landingImage.vue";

export default {
  name: "home",
  components: {
    Navbar
    //landingImage
  }
};
</script>


