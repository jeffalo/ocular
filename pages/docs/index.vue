<template>
  <div class="container">
    <Header
      :crumbs="[{link:'/docs', text:'docs'}]"
    />
    <div class="margined">
      <h1>documentation home</h1>
      <ul>
        <li v-for="doc of documents" :key="doc.path">
            <nuxt-link :to="doc.path">{{ doc.title }}</nuxt-link>
        </li>
      </ul>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'docs'
  },
  async asyncData({ $content, params, error }) {
    const documents = await $content('docs').only(['title'])
      .fetch()
      .catch((err) => {
          error(err);
      });
    return { documents }
  },
};
</script>

<style scoped>
.table {
  margin: 12px 0;
  padding: 2px 18px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--quote-border);
  background-color: var(--quote-background);
}

.toc2 {
    margin-left: 5px;
}

.toc3 {
    margin-left: 40px;
}
</style>