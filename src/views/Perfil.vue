<template>
  <div>
    <div id="titulo" class="row">
      <div class="container">
        <h1 class="display-3">Perfil</h1>
      </div>
    </div>
    <div id="formImage" class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <img src="../assets/avatar.png" alt="Avatar" width="160" height="160" />
        <InfoPerfil id="info" />
      </div>
    </div>
    <div id="formLogin" class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <!-- Default form register -->

        <h2>Alterar dados</h2>
        <form class="text-center border border-light p-5" action="#!">
          <div class="form-row mb-4">
            <div class="col">
              <!-- First name -->
              <input
                type="text"
                id="defaultRegisterFormFirstName"
                class="form-control"
                placeholder="Primeiro nome"
              />
            </div>
            <div class="col">
              <!-- Last name -->
              <input
                type="text"
                id="defaultRegisterFormLastName"
                class="form-control"
                placeholder="Último nome"
              />
            </div>
          </div>

          <!-- E-mail -->
          <input
            type="email"
            id="defaultRegisterFormEmail"
            class="form-control mb-4"
            placeholder="E-mail"
          />

          <!-- Password -->
          <input
            type="password"
            id="defaultRegisterFormPassword"
            class="form-control"
            placeholder="Password"
            aria-describedby="defaultRegisterFormPasswordHelpBlock"
          />
          <small
            id="defaultRegisterFormPasswordHelpBlock"
            class="form-text text-muted mb-4"
          >8 Caracteres e 1 número</small>
          <input
            type="password"
            id="defaultRegisterFormPasswordConfirm"
            class="form-control"
            placeholder="Confirmar Password"
            aria-describedby="defaultRegisterFormPasswordHelpBlock"
          />

          <!-- Sign up button -->

          <hr />
          <button
            class="btn my-4 btn-block btn-lg"
            style="background-color: #671919; color : #ffffff"
            type="submit"
          >Guardar</button>
        </form>
      </div>
      <div class="col-sm-2"></div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import InfoPerfil from "../components/InfoPerfil.vue";
export default {
  name: "Perfil",
  components: {
    InfoPerfil
  }
};
</script>

<style scoped>
#titulo {
  text-align: center;
  margin-bottom: 0%;
}
#info {
  margin-top: 4%;
  margin-bottom: 4%;
}
</style>