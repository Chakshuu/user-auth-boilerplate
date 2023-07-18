<template>
  <div class="login">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Login</h5>
        <form @submit.prevent="submit">
          <p v-if="showErrorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="loginData.email" type="email" class="form-control" id="email" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="loginData.password" type="password" class="form-control" id="password">
          </div>
          <button type="submit" class="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
      errorMessage: '',
      showErrorMessage: false
    }
  },
  methods: {
    async submit() {
      try {
        const res = await this.$store.dispatch('login', this.loginData);
        this.$router.push({ name: 'user' });
      } catch (error) {
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
        this.errorMessage = error;
      }
      
    }
  }
}
</script>

<style scoped>
.login .card{
  max-width: 40vw;
  margin: auto;
}
</style>
