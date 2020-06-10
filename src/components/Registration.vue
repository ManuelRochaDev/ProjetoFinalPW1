<template>
  <div id="registration">
    <br />
    <br />
    <div id="formLogin" class="row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4" id="formReg">
        <div id="title">
          <h1 id="h1">Registar</h1>
        </div>

        <!-- Default form register -->
        <form id="form" action="#!" v-on:submit.prevent="addUser()">
          <div class="form-row mb-4">
            <div class="col">
              <!-- First name -->
              <input
                id="name"
                type="text"
                v-model="name"
                required
                class="form-control"
                placeholder="Primeiro nome"
              />
            </div>
            <div class="col">
              <!-- Last name -->
              <input
                type="text"
                v-model="lastName"
                required
                id="lastName"
                class="form-control"
                placeholder="Último nome"
              />
            </div>
          </div>

          <!-- E-mail -->
          <input
            type="email"
            v-model="email"
            id="defaultRegisterFormEmail"
            class="form-control mb-4"
            placeholder="E-mail"
          />

          <!-- Password -->
          <input
            type="password"
            v-model="password"
            id="defaultRegisterFormPassword"
            class="form-control"
            placeholder="Password"
            minlength="6"
            required
            aria-describedby="defaultRegisterFormPasswordHelpBlock"
          />
          <small
            id="defaultRegisterFormPasswordHelpBlock"
            class="form-text text-muted mb-4"
          >8 Caracteres e 1 número</small>

          <!-- Sign up button -->
          <button id="sign-up" class="btn my-4 btn-block" type="submit">Registar</button>

          <!-- Access log-in page-->
          <button class="btn my-4 btn-block" id="login">
            <router-link id="link" to="/login">Login</router-link>
          </button>
        </form>
      </div>
      <div class="col-sm-4"></div>
    </div>
  </div>
</template>

<style scoped>
#title {
  text-align: center !important;
  margin: 0 auto;
  position: relative;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  margin-bottom: 5%;
  font-family: "EB Garamond", serif;
}

#h1 {
  margin: 0 auto;
  position: relative;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  padding-right: 0;
  width: 100%;
  font-size: 48px;
  font-family: "EB Garamond", serif;
  color: black;
}

#form {
  background: none;
  border: none;
  margin-bottom: 10%;
}

#formLogin {
  margin: 0 auto;
  vertical-align: center;
}

#formReg {
  margin: 0 auto;
  vertical-align: center;
  margin-top: 15%;
  margin-bottom: 12%;
  font-size: 14px;
  background-color: white;
  padding: 0%;
  box-shadow: 1px 10px 10px 0px rgba(92, 92, 92, 0.7);
}

#name {
  margin-right: -2px;
}

#lastName {
  margin-left: -2px;
}

#link {
  color: white;
}

h1 {
  margin-right: 50px;
}

#sign-up {
  margin-top: 5%;
  margin: 0 auto;
  background-color: black;
  color: #ffffff;
  height: 40px;
  font-size: 14px;
  width: 60%;
}

#sign-up:hover {
  background-color: rgba(216, 152, 68, 1);
}

#login {
  margin: 0 auto;
  margin-top: 5%;
  background-color: black;
  color: #ffffff;
  height: 40px;
  font-size: 14px;
  width: 60%;
}

#login:hover {
  background-color: rgba(216, 152, 68, 1);
}

input {
  margin: 0 auto;
  height: 40px;
  font-size: 14px;
  width: 60%;
}

#form {
  border: none;
}

#registration {
  background: linear-gradient(
    180deg,
    rgba(134, 26, 98, 0.8) 0%,
    rgba(216, 152, 68, 1) 100%
  );
}
</style>