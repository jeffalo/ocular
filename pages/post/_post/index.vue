<template>
  <div class="container">
    <Header :crumbs="[{ link: `/post/${id}`, text: 'post' }]" />
    <div class="margined">
      <Loading v-if="$fetchState.pending" />
      <Post v-if="!$fetchState.pending && !error" v-bind:post="post" />
      <Error
        v-if="error"
        :error="error.title"
        :details="error.details"
        :fullwidth="true"
      />
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.post.content.bb
        ? `${this.post.username}: "${this.post.content.bb}"`
        : `post id ${this.id}`,
    };
  },
  data() {
    return {
      id: this.$route.params.post,
      post: {
        time: {},
        content: {},
        parser: {},
        topic: {},
      },
      error: null,
    };
  },
  async fetch() {
    var postRes = await fetch(
      `https://scratchdb.lefty.one/v3/forum/post/info/${this.id}`
    ).catch((err) => {
      this.error = {
        title: "Network Error",
        details: "Failed to connect to ScratchDB.",
      };
    });
    var postData = await postRes.json();

    this.post = postData;
  },
  fetchOnServer: false,
};
</script>