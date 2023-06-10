<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import { useStore } from "./store";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const store = useStore();

      if (
        this.username === store.adminMockAccount.username &&
        this.password === store.adminMockAccount.password
      ) {
        // Login successful, redirect to admin dashboard
        this.$router.push("home");
      } else if (
        this.username === store.userMockAccount.username &&
        this.password === store.userMockAccount.password
      ) {
        // Login successful, redirect to user dashboard
        this.$router.push("home");
      } else {
        // Invalid credentials, show error message
        alert("Invalid username or password");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}
</style>
