<template>
  <div class="about">
    <div id="about" class="row" style="background-color: #131313; color:#ffffff;">
      <div class="col-sm-12 text-left">
        <h1 class="display-4">Sobre</h1>
        <br />
        <p>A plataforma Wineroute foi criada pelos alunos: Eduardo Madeira Silva, Manuel Rocha e Miguel Teixeira.</p>
        <p>
          Nasceu através do Projeto Interdisciplinar II, do segundo ano da Licenciatura em Tecnologias e Sistemas de
          Informação para a Web, da Escola Superior de Media, Artes e Design do Campus II do Politécnico do Porto.
        </p>
        <br><br>
        <p>
          O objetivo desta plataforma é ajudar as pessoas que têm gosto por percursos pedestres, a encontrar qual o
          melhor percurso mediante diversos ponto de interesse.
        </p>
        <br />
      </div>
    </div>
    <div id="about2" class="row" style="background-color: #131313; color:#ffffff;">
      <div class="col-sm-4">
        <img
          class="rounded-circle"
          src="../assets/eduardo.jpg"
          alt="Eduardo"
          width="150"
          height="150"
        />
        <figcaption class="figure-caption">Eduardo Madeira Silva</figcaption>
      </div>
      <div class="col-sm-4">
        <img
          class="rounded-circle"
          src="../assets/manuel.jpg"
          alt="Manuel"
          width="150"
          height="150"
        />
        <figcaption class="figure-caption">Manuel Rocha</figcaption>
      </div>
      <div class="col-sm-4">
        <img
          class="rounded-circle"
          src="../assets/miguel.png"
          alt="Miguel"
          width="150"
          height="150"
        />
        <figcaption class="figure-caption">Miguel Teixeira</figcaption>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  props: {
    msg: String
  },
  methods: {},
  created: function() {
    //Get path
    this.$store.state.currentPath = window.location.pathname;
  }
};
</script>

<style scoped>
#img h1 {
  color: #671919;
}

#img h6 {
  color: black;
}

#tituloSite {
  padding-top: 80px;
}

#about {
  padding-top: 100px;
  padding-bottom: 30px;
  padding-left: 13%;
  padding-right: 13%;
}
#about2{
  padding-top: 50px;
  padding-bottom: 30px;
  padding-left: 13%;
  padding-right: 13%;
}
h1{
  text-align: center;
  padding-right: 13%
}

</style>