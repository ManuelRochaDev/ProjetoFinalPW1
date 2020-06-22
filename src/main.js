import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
import axios from "axios";
import swal from "sweetalert2";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCia3pZ2qUX8TMQq1FUDmBL7D1NJEsOlms",
    libraries: "places"
  }
});

new Vue({
  router,
  store,
  axios,
  swal,
  render: h => h(App)
}).$mount("#app");
