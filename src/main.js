import Vue from "vue";
import App from "./App.vue";
// import GSignInButton from "vue-google-signin-button";
// Vue.use(GSignInButton);
import GAuth from "vue-google-oauth2";

new Vue({
  render: (h) => h(App),
}).$mount("#app");

const gauthOption = {
  clientId:
    "138488087349-cbaj29fitelgn44vc0qstpjrd66br3n6.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};
Vue.use(GAuth, gauthOption);
