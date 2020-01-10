<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "landingImage",
  props: {
    msg: String
  }
};



</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>