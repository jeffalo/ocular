<template>
  <div class="container">
    <Header pageName="post" :pageLink="`/post/${id}`" />
    <div class="margined">
      <Loading v-if="$fetchState.pending" />
      <Post v-if="!$fetchState.pending" v-bind:post="post"/>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.post,
      post: {
        time: {},
        content: {},
        parser: {},
        topic: {}
      },
    };
  },
  methods: {
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
    var postRes = await fetch(
      `https://scratchdb.lefty.one/v3/forum/post/info/${this.id}`
    );
    var postData = await postRes.json();

    this.post = postData;
  },
  fetchOnServer: false,
};
</script>