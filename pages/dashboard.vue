<template>
  <div class="container">
    <Header pageName="dashboard" pageLink="/dashboard" />
    <div class="margined">
      <h1>account dashboard</h1>
      <p>loggedin {{$auth.loggedIn()}}</p>
      <p>{{ $auth.user().status }}</p>
      <button @click="updateUser()">asdf</button>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  methods: {
    async updateUser() {
      await fetch(`${process.env.backendURL}/api/user/${this.$auth.user().name}`, {
        method: 'PUT',
        headers: {
          Authorization: this.$auth.token(),
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          status: Date.now(),
          color: 'blue'
        })
      })

      await this.$store.dispatch('auth/login', this.$auth.token()) // refresh user details
    }
  }
}
</script>