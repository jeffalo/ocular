<template>
  <footer>
    <a href="https://scratchdb.lefty.one/">ocular gets data from ScratchDB, which is currently down due to data loss. click here for more information.</a>
    <br>
    ocular is an open source project, with styling aspects inspired by the Scratch Foundation<br />
    API and data from
    <a class="footer-link" href="https://scratchdb.lefty.one/">@DatOneLefty</a>
    | authentication api from
    <a class="footer-link" href="https://auth.itinerary.eu.org/">@Looky1173</a>
    <br /><br />this forum viewer tool falls under Creative Commons
    Attribution-ShareAlike 2.0 license <br /><br />
    <nuxt-link class="footer-link" to="/docs/privacy">privacy</nuxt-link>
    | <button class="footer-link" @click="toggleTheme()"><Emoji>🎨</Emoji> theme ({{ $colorMode.preference }})</button>
    <span v-if="$colorMode.preference == 'catsunited'">|</span>
    <button class="footer-link full" v-if="$colorMode.preference == 'catsunited'" @click="dog()">cat</button>
    <img v-if="dogURL" :src="dogURL" style="display: block; margin-top: 10px;" width="200">
  </footer>
</template>

<script>
export default {
  data() {
    return {
      dogURL: ""
    }
  },
  methods: {
    toggleTheme() {
      let current = this.$colorMode.preference
      let themes = ['system', 'light', 'purple', 'dark', 'dark-purple', 'gray', 'scratch', 'catsunited', 'classic-dark']
      let switchTo = themes[themes.indexOf(current)+1]
      this.$colorMode.preference = switchTo || 'system'
    },
    async dog() {
      this.dogURL = ""
      let dog = await fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json())

      this.dogURL = dog.message
    }
  }
}
</script>

<style scoped>
footer {
  padding-top: 10px;
  margin-top: 10px;
  color: var(--footer-text);
  padding-bottom: 10px;
}
.footer-link {
  color: var(--footer-text);
  /* reset for buttons */
  font-weight: bold;
  background: none;
  border: none;
  border-radius: 0;
  padding: 0;
  margin: 0;
  line-height: normal;
  cursor: pointer;
}
</style>
