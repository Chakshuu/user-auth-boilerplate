<template>
  <div class="register">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Register</h5>
        <form @submit.prevent="submit">
          <p v-if="showErrorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input v-model="registerData.username" type="text" class="form-control" id="username" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="first_name" class="form-label">First Name</label>
            <input v-model="registerData.first_name" type="text" class="form-control" id="first_name" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Last Name</label>
            <input v-model="registerData.last_name" type="text" class="form-control" id="last_name" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="registerData.email" type="email" class="form-control" id="email" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="registerData.password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">Confirm Password</label>
            <input v-model="registerData.password_confirm" type="password" class="form-control" id="password_confirm">
          </div>
          <button type="submit" class="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      registerData: {
        email: '',
        first_name: '',
        password: '',
        password_confirm: '',
        last_name: '',
        username: '',
      },
      errorMessage: '',
      showErrorMessage: false
    }
  },
  methods: {
    async submit() {
      try {
        const res = await this.$store.dispatch('register', this.registerData);
        this.$router.push({ name: 'login' });
      } catch (error) {
        this.showErrorMessage = true;
        this.errorMessage = error;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
.register .card{
  max-width: 40vw;
  margin: auto;
}
</style>
