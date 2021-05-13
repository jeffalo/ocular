<template>
  <div class="container">
    <Header
      :crumbs="[{link:'/docs', text:'docs'}]"
    />
    <div class="margined">
      <h1>documentation home</h1>
      <ul>
        documentation currently down for maintenance
        <!-- <li v-for="doc of documents" :key="doc.path">
            <nuxt-link :to="doc.path">{{ doc.title }}</nuxt-link>
        </li> -->
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