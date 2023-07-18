<template>
  <div id="user">
    <div class="container">
      <div v-if="user" class="card card-body mt-4">
        <h5 class="card-title">Username: {{ user.username }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Email: {{ user.email }}</h6>
        <h6 class="card-subtitle mb-2 text-muted">First Name: {{ user.first_name }}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Last Name: {{ user.last_name }}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Full Name: {{ user.full_name }}</h6>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
    }
  },
  methods: {
    async getUser() {
      await this.$store.dispatch('getUser');
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  async mounted(){
    if (!this.$store.state.user) {
      await this.getUser();
    }   
  }
}
</script>

<style></style>
