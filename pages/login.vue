<template>
  <div class="container">
    <Header pageName="login" pageLink="/login" />
    <div class="margined">
      <h1>login</h1>
      <p>
        ocular uses a number of services to provide various tools to enhance the
        experience. these services may collect and or use data according to
        their privacy policies.
      </p>
      <form @submit.prevent="submit" autocomplete="off">
        <input type="text" class="input" placeholder="jeffalo" v-model="username"/>
        <button type="submit" class="form-button">go</button>
      </form>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'notauthenticated',
  data() {
    return {
      username: "",
    };
  },
  methods: {
    async submit() {
      if(this.username) window.location.href = `${process.env.backendURL}/auth/begin?user=${this.username}`;
    },
  },
};
</script>