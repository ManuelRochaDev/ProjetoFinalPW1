<template>
  <main>
    <div class="background">
      <img src="../assets/vindimas.jpg" id="mainImg" />
      <div class="container">
        <div class="row" id="mainDesc">
          <div class="col-sm-12" id="catchCol">
            <h2 id="catch">
              Os novos caminhos
              <br />são para se explorar.
            </h2>
          </div>
          <div class="col-sm-12" id="miniDescCol">
            <h2 id="miniDesc">Destinatário para rotas de enoturismo</h2>
          </div>
        </div>
      </div>
    </div>

    <section>
      <div class="container-fluid" id="callToAct">
        <div class="row" id="textRow">
          <h2 id="call">Veja a nossa página de rotas e comece a viajar!</h2>
          <h4 id="descr">
            Aceda aos nossos diversos precursos feitos pela zona do douro
            <br />cada um com os seus pontos turísticos para explorar.
          </h4>
          <button class="btn btn-lg" value="Ir" id="ir" @click="$router.push('percursos')">Percursos</button>
        </div>
      </div>
    </section>

    <section id="team">
      <div id="about" class="row">
        <div class="col-sm-12" id="sobre">
          <h4 id="sobreW">Sobre o WineRoute</h4>
          <br />
          <p id="sobreDesc">
            O WineRoute nasceu através do Projeto Interdisciplinar II, do segundo ano da Licenciatura em
            Tecnologias e Sistemas de
            Informação para a Web, na ESMAD.
            O objetivo desta plataforma é ajudar as pessoas que têm gosto por percursos de enoturismo a
            encontrar o
            melhor percurso mediante os seus gostos.
          </p>
          <br />
        </div>
      </div>

      <div class="container-fluid" id="developers">
        <h4 id="devs">Desenvolvedores do website:</h4>

        <div class="row" id="devRow">
          <div id="cards" class="card-deck">
            <div class="col-md-4 col-sm-12 col-xs-12">
              <div class="card">
                <img
                  class="rounded-circle"
                  src="../assets/eduardo.jpg"
                  alt="Eduardo"
                  width="150"
                  height="150"
                />
                <h4 class="figCaption">Eduardo Madeira Silva</h4>
                <div class="card-body">
                  <p class="card-text">
                    Prototipagem UI e modelação do sistema
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12 col-xs-12">
              <div class="card">
                <img
                  class="rounded-circle"
                  src="../assets/manuel.jpg"
                  alt="Manuel"
                  width="150"
                  height="150"
                />
                <h4 class="figCaption">Manuel Rocha</h4>
                <div class="card-body">
                  <p class="card-text">Programador principal (middleware, back-end, base de dados)</p>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12 col-xs-12">
              <div class="card">
                <img
                  id="miguel"
                  class="rounded-circle"
                  src="../assets/miguel.jpg"
                  alt="Miguel"
                  width="150"
                  height="150"
                />
                <h4 class="figCaption">Miguel Teixeira</h4>
                <div class="card-body">
                  <p class="card-text">Desenvolvedor do front-end do website</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
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


<style scoped>
/*Main sections*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  position: relative;
  height: 100vh;
  width: 100%;
}

body {
  font-size: 16px;
  width: auto;
  margin: 0 auto;
  padding: 0;

  display: flex;
  flex-direction: column;
  background-color: white;
  color: white !important;
}

main {
  min-height: 100%;
  position: relative;
  width: auto;
  overflow: hidden;
}

@media only screen and (max-width: 600px) {
  #miniDesc {
    margin-top: 100px;
  }
}

@media only screen and (max-width: 962px) {

  #miniDesc {
    margin-top: 120px !important;
  }
}


/*-----Main sections-----*/

/*Text*/

span {
  color: rgb(255, 192, 109);
  font-weight: 500;
}

p {
  font-size: 16px;
  font-weight: lighter;
  font-family: "Catamaran", sans-serif;
}

h1 {
  font-weight: 400;
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
  padding-bottom: 10px;
  font-family: "Catamaran", sans-serif;
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

ul {
  list-style-type: none;
}

hr {
  color: white;
  margin: 0% 15% 0% 15%;
  border: 0.5px solid rgb(255, 255, 255, 0.3);
}

#hr2 {
  margin: 0% 35% 0% 35%;
}

/*-----Text-----*/

/*Center Image & description*/

#mainImg {
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: 300%;
  object-fit: cover;
}

#catch {
  text-align: left;
  position: absolute;
  margin-top: 20px;
  font-size: calc(24px + 2vw) !important;
}

#catchCol {
  top: 0%;
  text-align: left;
  position: absolute;
}


#miniDesc {
  margin: 0 auto;
  position: absolute;
  margin-top: 160px;
  text-align: left;
  color: rgb(216, 152, 68);
  font-family: "Catamaran", sans-serif;
  font-weight: 200;
  font-size: calc(16px + 0.5vw);
}

#miniDescCol {
  top: 0%;
  text-align: left;
  position: absolute;
}

.background {
  position: relative;
  width: 100%;
  z-index: -1;
}

#callToAct {
  margin: 0 auto;
  min-height: 70vh;
  position: relative;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: rgb(216, 165, 97);
  min-width: 100%;
}

#call {
  left: 0px;
  top: 100px;
  margin: 0 auto;
  color: rgb(0, 0, 0);
  font-size: calc(24px + 2vw);
}

#descr {
  margin: 0 auto;
  top: 100px;
  left: 15%;
  width: 100%;
  color: white;
  margin-top: 200px;
  font-size: calc(10px + 0.8vw);
  font-family: "Catamaran", sans-serif;
}

#ir {
  display: block;
  margin: 0 auto;
  background-color: #221d23;
  color: white;
  width: 25%;
  height: 50px;
  margin-top: 25px;
  font-family: "Catamaran", sans-serif;
  font-size: 20px;
  text-align: center;
}

.center {
  justify-content: center;
  text-align: center;
}

#ir:hover {
  background-color: rgb(134, 26, 98);
}

/*-----Center Image & description-----*/

/*About*/

#team{
  background-color: white;
}

#devs {
  color: #131313;
  background-color: #ffffff;
  font-family: "EB Garamond", serif;
  font-size: 48px;
  padding-top: 50px;
  margin: auto;
  align-content: center;
}

#developers {
  color: #131313;
  background-color: #ffffff;
  width: 90%;
  margin: auto;
  margin-top: 2%;
  padding-bottom: 5%;
  margin-bottom: 0;
  text-align: center;
}

#tituloSite {
  padding-top: 80px;
}

#about {
  padding-top: 80px;
  padding-bottom: 20px;
  padding-left: 13%;
  padding-right: 13%;
  text-align: center;
}

.figCaption {
  color: rgb(12, 138, 29);
  padding-top: 20px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 0px;
  font-weight: lighter;
}

h1 {
  text-align: center;
  padding-right: 13%;
}

.about {
  font-size: 16px;
  padding-bottom: 100px;
}

#sobreW {
  font-family: "EB Garamond", serif;
  font-size: 48px;
  font-weight: lighter;
  color: black;
  padding-bottom: 2%;
}

.row {
  padding-right: 2%;
  padding-left: 2%;
}

.rounded-circle {
  transition: 0.3s ease;
  align-content: center;
  cursor: pointer;
  width: 90%;
  height: auto;
  max-height: 70%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}

img:hover {
  transform: scale(1.1, 1.1);
  box-shadow: 0px 0px 4px 2px rgb(12, 138, 29);
  filter: blur();
}

.card {
  margin: 0 auto;
  height: auto;
  width: 80%;
  border: none;
  padding-top: 25px;
  padding-bottom: 50px;
  padding-right: 15px;
  padding-left: 15px;
  color: black;
  border:none;
  box-shadow: none;
  font-weight: lighter;
}

.card:hover {
  border: none;
}

.card-text{
  text-align: center;
  overflow: hidden;
}

.card-body {
  font-size: 16px;
  color: rgba(94, 94, 94, 0.8);
  font-weight: lighter;
}

#cards {
  margin: 0 auto;
  width: 100%;
  text-align: center;
}

.sep {
  margin: 0 auto;
  position: relative;
  background-color: rgb(134, 26, 98, 0.6);
  border: 2px;
  width: 50%;
  height: 1px;
  margin-bottom: 40px;
}

.fas{
  color: rgba(134, 26, 98, 0.8);
}

/*-----about-----*/
</style>