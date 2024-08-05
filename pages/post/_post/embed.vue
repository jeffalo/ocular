<template>
  <div>
    <Loading v-if="$fetchState.pending" />
    <Post v-if="!$fetchState.pending && post && !error" v-bind:post="post" />
    <Error
      v-if="error"
      :error="error.title"
      :details="error.details"
      :fullwidth="true"
    />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.post?.content?.bb
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
      `https://scratchdb.lefty.one/search/indexes/forum_posts/search?filter=id=${this.id}`,
      {
        headers: {
          authorization:
            "Bearer 3396f61ef5b02abf801096be5f0b0ee620de304dd92fc6045aeb99539cd0bec4",
        },
      }
    ).catch((err) => {
      this.error = {
        title: "Network Error",
        details: "Failed to connect to ScratchDB.",
      };
    });
    var postData = await postRes.json();

    if (!postData?.hits[0]) {
      return (this.error = {
        title: "Post not found",
        details: "The requested post could not be found.",
      });
    }

    this.post = postData.hits[0];
  },
  fetchOnServer: false,
};
</script>

