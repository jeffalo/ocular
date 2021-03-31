<template>
  <div class="container">
    <Header pageName="starred" pageLink="/starred" />
    <div class="margined">
      <h1>starred posts</h1>
      <Loading v-if="$fetchState.pending" />
      <div v-if="!$fetchState.pending">
        <PostList :posts="posts" :loading="$fetchState.pending" @loadMore="loadMore()" :showLoadMore="showLoadMore"/>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  data() {
    return {
      page: 0,
      posts: {},
      showLoadMore: false
    };
  },
  methods: {
    async loadMore() {
      this.showLoadMore = false
      this.page++;

      let res = await fetch(`${process.env.backendURL}/api/starred?page=${this.page}`, {
          headers: {
              Authorization: this.$auth.token()
          }
      });
      let data = await res.json();
      this.posts.push(...data);

      this.showLoadMore = true
    },
  },
  async fetch() {
    let res = await fetch(`${process.env.backendURL}/api/starred?page=${this.page}`, {
        headers: {
            Authorization: this.$auth.token()
        }
    });
    let data = await res.json();

    this.posts = data;

    this.showLoadMore = true;
  },
  fetchOnServer: false,
};
</script>