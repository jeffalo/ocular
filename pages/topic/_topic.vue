<template>
  <div class="container">
    <Header pageName="topic" :pageLink="`/topic/${topic}`" />
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
        <Post
          v-for="post of data.posts"
          v-bind:key="post.id"
          v-bind:post="post"
        />
        <button @click="loadMore()">Load More</button>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topic: this.$route.params.topic,
      page: 0,
      data: {},
    };
  },
  methods: {
    async loadMore() {
      this.page++;

      var postsRes = await fetch(
        `https://scratchdb.lefty.one/v3/forum/search/?q=%2Btopic%3A${this.topic}&page=${this.page}&o=oldest`
      );
      var postData = await postsRes.json();
      this.data.posts.push(...postData.posts);
    },
    scratchBlocksify() {
      scratchblocks.renderMatching("pre.blocks:not(.scratchblockrendered)", {
        style: "scratch2", // Optional
      });
      document
        .querySelectorAll("pre.blocks:not(.scratchblockrendered)")
        .forEach((i) => {
          i.classList.add("scratchblockrendered");
        });
    },
  },
  updated: function () {
    this.$nextTick(function () {
      this.scratchBlocksify();
    });
  },
  mounted: function () {
    this.scratchBlocksify();
  },
  async fetch() {
    var userPostsRes = await fetch(
      `https://scratchdb.lefty.one/v3/forum/search/?q=%2Btopic%3A${this.topic}&page=${this.page}&o=oldest`
    );
    var userPosts = await userPostsRes.json();

    this.data = userPosts;
  },
  fetchOnServer: false,
};
</script>