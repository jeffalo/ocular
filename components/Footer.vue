<template>
  <footer>
    this front end is an open source project, with styling aspects inspired by
    <a href="https://scratch.mit.edu/users/maximouse" class="footer-link"
      >@Maximouse</a
    >
    and Scratch by MIT<br />
    API and data from
    <a class="footer-link" href="https://scratchdb.lefty.one/">@DatOneLefty</a>
    | profile picture api from
    <a class="footer-link" href="https://hamptonmoore.com">@herohamp</a>
    <br /><br />this forum viewer tool falls under Creative Commons
    Attribution-ShareAlike 2.0 license <br /><br />
    <nuxt-link class="footer-link" to="/privacy">privacy</nuxt-link>
    | <button class="footer-link" @click="toggleTheme()">🎨 theme ({{ $colorMode.preference }})</button>
  </footer>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      let current = this.$colorMode.preference
      if(current == 'system') return this.$colorMode.preference = 'light'
      if(current == 'light') return this.$colorMode.preference = 'dark'
      if(current == 'dark') return this.$colorMode.preference = 'scratch'
      if(current == 'scratch') return this.$colorMode.preference = 'system'
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