<template>
  <div>
    <div id="titulo" class="row">
      <div class="container">
        <h1>Perfil</h1>
      </div>
    </div>
    <div id="formImage" class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <img src="../assets/avatar.png" alt="Avatar" width="200" height="200" />
        <br />
        <br />
      </div>
    </div>
    <br />
    <br />
    <InfoPerfil />
    <div id="formLogin" class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <!-- Default form register -->

        <h1>Alterar dados</h1>
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
            class="btn my-4 btn-block"
            style="background-color: #671919; color : #ffffff"
            type="submit"
          >Guardar</button>
        </form>
      </div>
      <div class="col-sm-2"></div>
    </div>
  </div>
</template>

<script>
import InfoPerfil from "../components/InfoPerfil.vue";
export default {
  name: "Perfil",
  components: {
    InfoPerfil
  },
};
</script>

<style scoped>
#titulo {
  text-align: center;
}
</style>