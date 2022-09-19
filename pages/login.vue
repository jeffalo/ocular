<template>
  <div class="container">
    <Header :crumbs="[{link:'/login', text:'login'}]" />
    <div class="margined">
      <h1>login</h1>
      <div :class="`alert error`" v-if="$route.query.error">
        {{ errorMessages[$route.query.error] }}
      </div>
      <p>
        logging into ocular will allow you to customize your profile, save posts and more! if you do not have an account, this will create one for you
      </p>
      <button @click="login"><Emoji>🐈</Emoji> login with scratch</button>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'notauthenticated',
  head: {
    title: 'login'
  },
  data() {
    return {
      username: "",
      errorMessages: [
      'failed fluffyscratch auth: keep in mind login currently does not support new scratchers.',
      'somehow you authenticated correctly but your scratch account couldnt be found. contact jeffalo.'
      ],
      usernames: ['Jeffalo', 'CatsUnited', 'Za-Chary', 'fdreerf', 'mybearworld', '-InsanityGames-', 'Paddle2See', 'Harakou', 'leahcimto', 'WindOctahedron', 'DatOneLefty', 'Virus6120', 'GrahamSH']
      // just some random usernames to make stuff more lively. TODO: api endpoint on my-ocular for random user?
    };
  },
  computed: {
    randomUsername () {
      return this.usernames[Math.floor(Math.random() * this.usernames.length)];
    }
  },
  methods: {
    async login() {
      window.location.href = `${process.env.backendURL}/auth/begin?user=${this.username}`;
    },
  },
};
</script>
