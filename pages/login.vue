<template>
  <div class="container">
    <Header pageName="login" pageLink="/login" />
    <div class="margined">
      <h1>login</h1>
      <div :class="`alert error`" v-if="$route.query.error">
        {{ errorMessages[$route.query.error] }}
      </div>
      <p>
        logging into ocular will allow you to customize your profile, save posts and more! if do not have an account, this will create one for you
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
      errorMessages: ['failed fluffyscratch auth: make sure you are logged into the correct scratch account and try again. login currently does not support new scratchers. ','123']
    };
  },
  methods: {
    async submit() {
      if(this.username) window.location.href = `${process.env.backendURL}/auth/begin?user=${this.username}`;
    },
  },
};
</script>