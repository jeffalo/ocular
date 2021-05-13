<template>
  <div class="container">
    <Header :crumbs="[{link:`/youtube/${$nuxt.context.route.params.id}`, text:'youtube'}]" />
    <div class="margined">
      <h1>youtube</h1>
      <p>scratch converts youtube links to links to their own player page to prevent people from seeing youtube or something. this page is here to simulate the true scratch experience.</p>
      <a :href="`https://youtube.com/watch?v=${$nuxt.context.route.params.id}`">watch on youtube</a>
      <iframe class="youtube-player" type="text/html" width="538" height="324" :src="`https://www.youtube.com/embed/${$nuxt.context.route.params.id}`" frameborder="0" allowfullscreen="true"></iframe>
      <Footer />
    </div>
  </div>
</template>
<style scoped>
.youtube-player{
  display: block;
}
</style>

<script>
export default {
  head: {
    title: 'youtube player'
  },
}
</script>