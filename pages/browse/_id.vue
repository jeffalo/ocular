<template>
  <div class="container">
    <Header :crumbs="[{ link: `/browse/${id}`, text: 'browse' }]" />
    <div class="margined">
      <h1>browse topics</h1>
      <p>
        note: this feature is in beta and may change at any time. also it's a
        bit slow due to scratchdb things.
      </p>
      <ForumSelector :selected="id" />
      <Loading v-if="$fetchState.pending" />
      <Error v-if="error" :error="error.title" :details="error.details" />
      <TopicList
        :topics="topics"
        v-if="!$fetchState.pending && !error"
        :showLoadMore="showLoadMore"
        @loadMore="loadMore()"
      />
      <Footer />
    </div>
  </div>
</template>

<script>
import map from "@/assets/category-map.js";

export default {
  data() {
    return {
      id: this.$route.params.id,
      category: "",
      topics: [],
      page: 0,
      showLoadMore: false,
      error: null,
    };
  },
  async asyncData({ params, error }) {
    const category = map.get(params.id);
    if (!category) error("unknown category");
    return { category };
  },
  methods: {
    async loadMore() {
      this.page++;
      await this.fetchTopics(this.page);
    },
    async fetchTopics(page) {
      return new Promise(async (resolve, reject) => {
        this.showLoadMore = false;
        let topicListRes = await fetch(
          `https://scratchdb.lefty.one/v3/forum/category/topics/${this.category}/${page}/?detail=2`
        ).catch((err) => {
          this.error = {
            title: "Network Error",
            details: "Failed to connect to ScratchDB.",
          };
          resolve();
        });
        let topicList = await topicListRes.json();

        this.topics.push(...topicList);

        this.showLoadMore = true;
        resolve();
      });
    },
  },
  async fetch() {
    await this.fetchTopics(this.page);
  },
  fetchOnServer: false,
};
</script>
