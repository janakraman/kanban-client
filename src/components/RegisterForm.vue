<template>
  <div>
    <h1>Register</h1>
    <form>
      <div class="mb-3">
        <label for="register-username" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="register-username"
          v-model="registerUsername"
        />
      </div>
      <div class="mb-3">
        <label for="register-password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="register-password"
          v-model="registerPassword"
        />
      </div>
      <div class="mb-3">
        <label for="register-email" class="form-label">Email</label>
        <input
          type="text"
          class="form-control"
          id="register-email"
          v-model="registerEmail"
        />
      </div>
      <div class="mb-3">
        <label for="register-firstName" class="form-label">First name</label>
        <input
          type="text"
          class="form-control"
          id="register-firstName"
          v-model="registerFirstName"
        />
      </div>
      <div class="mb-3">
        <label for="register-lastName" class="form-label">Last name</label>
        <input
          type="text"
          class="form-control"
          id="register-lastName"
          v-model="registerLastName"
        />
      </div>
      <button
        type="submit"
        class="btn custom-color-1"
        @click.prevent="register"
      >
        Register
      </button>
      <button
        type="submit"
        class="btn custom-color-3"
        @click.prevent="movePage('login')"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data(){
    return {
      registerUsername : "",
      registerPassword: "",
      registerEmail: "",
      registerFirstName: "",
      registerLastName: "",
    }
  },
  methods: {
    register(){
      const data = {
        username: this.registerUsername,
        password: this.registerPassword,
        email: this.registerEmail,
        firstName: this.registerFirstName,
        lastName: this.registerLastName,
      }
      this.$emit("register", data);
    },
    movePage(page) {
      this.$emit("movePage", page);
    },
  },
};
</script>

<style>
</style>