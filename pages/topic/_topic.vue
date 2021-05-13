<template>
  <div class="container">
    <Header :crumbs="[{link:`/topic/${topic}`, text:'topic'}]" />
    <div class="margined">
      <Loading v-if="$fetchState.pending" />
      <div v-if="!$fetchState.pending">
        <div v-if="data.posts && data.posts[0]">
          <h1 style="display: inline-block">{{ data.posts[0].topic.title }}</h1>
          <p>
            id: <b>{{ data.posts[0].topic.id }}</b>
          </p>
          <p>
            category: <b>{{ data.posts[0].topic.category }}</b>
          </p>
        </div>
        <PostList :posts="data.posts" :loading="$fetchState.pending" @loadMore="loadMore()" :showLoadMore="showLoadMore"/>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.data.posts ? this.data.posts[0].topic.title : `topic id ${this.topic}`
    }
  },
  data() {
    return {
      topic: this.$route.params.topic,
      page: 0,
      data: {},
      showLoadMore: false
    };
  },
  methods: {
    async loadMore() {
      this.showLoadMore = false
      this.page++;

      var postsRes = await fetch(
        `https://scratchdb.lefty.one/v3/forum/search/?q=%2Btopic%3A${this.topic}&page=${this.page}&o=oldest`
      );
      var postData = await postsRes.json();
      this.data.posts.push(...postData.posts);

      this.showLoadMore = true
    },
  },
  async fetch() {
    var userPostsRes = await fetch(
      `https://scratchdb.lefty.one/v3/forum/search/?q=%2Btopic%3A${this.topic}&page=${this.page}&o=oldest`
    );
    var userPosts = await userPostsRes.json();

    this.data = userPosts;
    this.showLoadMore = true
  },
  fetchOnServer: false,
};
</script>