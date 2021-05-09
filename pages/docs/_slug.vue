<template>
  <div class="container">
    <Header
      :crumbs="[{link:'asdf', text:'asdf'},{link:'asdf', text:'asdf'}]"
      :pageName="page.headertitle || page.title"
      :pageLink="`/docs${page.path}`"
    />
    <div class="margined">
      <h1>{{ page.title }}</h1>
      <div class="table" v-if="page.toc.length > 0">
        <h3>table of contents: </h3>
        <ul>
          <li
            v-for="link of page.toc"
            :key="link.id"
            :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }">

            <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
          </li>
        </ul>
      </div>
      <nuxt-content :document="page" />
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.page.title,
    };
  },
  async asyncData({ $content, params, error }) {
    const slug = params.slug || "index";
    const page = await $content(slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: "This page could not be found" });
      });

    return {
      page,
    };
  },
};
</script>

<style scoped>
.table {
  margin: 12px 0;
  padding: 5px 18px;
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