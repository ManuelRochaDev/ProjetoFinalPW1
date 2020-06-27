<template>
  <!--Footer-->
  <footer>
    <div class="container">
      <div id="upperRow" class="row text-center d-flex justify-content-center pt-5 mb-3">
        <div class="col-md-2 mb-3">
          <h6 class="text-uppercase font-weight-bold">
            <router-link to="/" class="footer-link">Home</router-link>
          </h6>
        </div>

        <div class="col-md-2 mb-3">
          <h6 class="text-uppercase font-weight-bold">
            <router-link to="/percursos" class="footer-link">Percursos</router-link>
          </h6>
        </div>



        <div class="col-md-2 mb-3">
          <h6 class="text-uppercase font-weight-bold">
            <router-link to="/perfil" class="footer-link">Perfil</router-link>
          </h6>
        </div>
      </div>

      <hr />

      <div id="footerContent" class="row d-flex text-center justify-content-center mb-md-0 mb-4">
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 class="text-uppercase mb-4 font-weight-bold">Contactos</h6>
          <p>
            <i class="fas fa-home mr-3"></i> 981, R. Dom Sancho I, 4480-876
          </p>
          <p>
            <i class="fas fa-envelope mr-3"></i> 9170249@esmad.ipp.pt
          </p>
          <p>
            <i class="fas fa-phone mr-3"></i> +351 96 5555 605
          </p>
        </div>
      </div>

      <hr id="hr2" />
    </div>

    <div class="footer-copyright text-center py-3">
      <h4>&copy;WineRoute</h4>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String
  }
}
</script>


<style scoped>
html {
  position: relative;
  height: 100vh;
  width: 100%;
}

body {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

footer {
  width: 100%;
  position: relative;
  bottom: 0;
  font-family: "EB Garamond", serif;
  font-weight: 200;
  color: rgb(255, 192, 109, 0.5);
  text-align: center;
  background-color: #221d23;
  box-sizing: border-box;
}

p {
  text-align: center;
  font-size: 16px;
  padding-top: 2%;
  padding-bottom: 2%;
}

h1 {
  font-weight: 400;
  padding-top: 5%;
  padding-bottom: 5%;
}

h2 {
  position: absolute;
  top: 200px;
  left: 15%;
  width: 100%;
  color: white;
  font-size: 4vw;
  font-family: "EB Garamond", serif;
  font-weight: lighter;
}

h4 {
  font-family: "EB Garamond", serif;
  font-size: 24px;
  padding-top: 1%;
  padding-bottom: 1%;
}

h6 {
  font-size: 16px;
  padding-top: 5%;
  padding-bottom: 5%;
}

a {
  text-decoration: none;
  color: white;
  font-family: "Catamaran", sans-serif;
  font-weight: 200;
}

a:hover {
  color: rgb(255, 192, 109);
}

hr {
  color: white;
  margin: 0% 15% 0% 15%;
  border: 0.5px solid rgb(255, 255, 255, 0.3);
}

#hr2 {
  margin: 0% 35% 0% 35%;
}

#footerContent{
  margin: 0 auto;
  text-align: center;
}

i{
  margin-left: 10px;
}
</style>