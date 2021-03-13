<template>
  <div class="container">
    <Header pageName="user" :pageLink="`/user/${user}`" />
    <div class="margined">
      <Loading v-if="$fetchState.pending" />
      <div v-if="!$fetchState.pending">
        <h1 style="display: inline-block">{{ user }}</h1>
        <!-- todo: use classes instead of inline css -->
        <Status :user="user" style="display: inline" />
        <h2>{{ user }}'s posts</h2>
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
      user: this.$route.params.username,
      page: 0,
      data: {},
      info: {},
    };
  },
  methods: {
    async loadMore() {
      this.page++;

      var postsRes = await fetch(
        `https://scratchdb.lefty.one/v3/forum/user/posts/${this.user}/${this.page}`
      );
      var postData = await postsRes.json();
      this.data.posts.push(...postData);
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
    var userInfoRes = await fetch(
      `https://scratchdb.lefty.one/v3/forum/user/info/${this.user}`
    );
    var userInfo = await userInfoRes.json();

    var userPostsRes = await fetch(
      `https://scratchdb.lefty.one/v3/forum/user/posts/${this.user}/${this.page}`
    );
    var userPosts = await userPostsRes.json();

    this.info = userInfo;
    this.data.posts = userPosts;
  },
  fetchOnServer: false,
};
</script>