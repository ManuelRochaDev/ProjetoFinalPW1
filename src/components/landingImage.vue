<template>
  <div>
    <div></div>
    <div id="img" class="row">
      <div class="col-sm-4">
        <h1>WINEROUTE</h1>
        <h6>A APRECIAÇÃO DO VINHO NACIONAL</h6>
      </div>
      <div class="col-sm-8">
        <img class="img-fluid" src="../assets/uvas.png" alt="Uvas" width="600" height="600" />
      </div>
    </div>
    <div class="image" id="siteInfo">
      <img src="../assets/ahhh.jpg" id="enoImage" alt />
      <div class="text-block" id="blocoTexto">
        <h1 class="display-4" id="overlayText">
          WineRoute foi criado com o propósito de mostrar diversas rotas onde se pratica o enoturismo.
          Veja as nossas rotas para experienciar novos caminhos
          <br />
          <br />
          <button class="btn btn-dark btn-lg" value="Ir" id="ir">
             <router-link id="link" to="/percursos">Entre agora</router-link>
          </button>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "landingImage",
  props: {
    msg: String
  },
  created: function() {
    this.$store.state.currentPath = window.location.pathname;
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
}

#img h1 {
  color: #671919;
  margin-right: 50px;
}

#img h6 {
  color: black;
  margin-left: 30px;
}

#siteInfo {
  padding-top: 6%;
  overflow: auto;
  max-height: 60%;
}

#enoImage {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 70%;
  max-width: 100%;
  max-height: 100%;
  filter: brightness(40%);
}

#overlayText {
  position: absolute;
  top: 160%;
  left: 0;
  width: 80%;
  padding-right: 50px;
}

html {
  scroll-behavior: smooth;
}

#ir {
  width: 20%;
  height: 10%;
  background-color: #671919;
  margin-right: 20px;
}

.text-block{
  color:white;
  background-color: black
}

#link{
  color:white
}
</style>