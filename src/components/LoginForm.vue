<template>
  <div>
    <h1>Login</h1>
    <form>
      <div class="mb-3">
        <label for="login-input" class="form-label">Username / email</label>
        <input
          v-model="loginInput"
          type="text"
          class="form-control"
          id="login-input"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your username / email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="login-password" class="form-label">Password</label>
        <input
          v-model="loginPassword"
          type="password"
          class="form-control"
          id="login-password"
        />
      </div>
      <button type="submit" class="btn custom-color-1" @click.prevent="login">
        Login
      </button>
      <button
        type="submit"
        class="btn custom-color-3"
        @click.prevent="movePage('register')"
      >
        Not Registered?
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      loginInput: "",
      loginPassword: "",
    };
  },
  methods: {
    login() {
      let data = {
        input: this.loginInput,
        password: this.loginPassword,
      };
      // console.log(data);
      this.$emit("login", data);
    },
    movePage(page) {
      this.$emit("movePage", page);
    },
  },
};
</script>

<style>
</style>