<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name: 'home'}">Navbar</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#appNavbar" aria-controls="appNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="appNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{name: 'home'}" class="nav-link" aria-current="page">Home</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <router-link :to="{name: 'user'}" class="nav-link" aria-current="page">Profile</router-link>
            </li>
            <li class="nav-item">
              <button @click="logout" class="nav-link" aria-current="page">Logout</button>
            </li>
          </template>
          
          <template v-else>
            <li class="nav-item">
              <router-link :to="{name: 'login'}" class="nav-link" aria-current="page">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'register'}" class="nav-link" aria-current="page">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push({ name: 'home' });
      } catch(err) {
        console.log(err.message);
      }
    }
  }
}
</script>

<style>

</style>
