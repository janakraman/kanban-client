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
    "84018128438-tn5pe94udepbqlfgto2f5e22h85qh9kc.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};
Vue.use(GAuth, gauthOption);
