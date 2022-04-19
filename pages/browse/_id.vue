<template>
  <div class="container">
    <Header :crumbs="[{ link: `/browse/${id}`, text: 'browse' }]" />
    <div class="margined">
      <h1>browse topics</h1>
      <p>note: this feature is in beta and may be changed at any time. it's also a bit slow due to scratchdb things.</p>
      <ForumSelector :selected="id" />
      <Loading v-if="$fetchState.pending" />
      <TopicList
        :topics="topics"
        v-if="!$fetchState.pending"
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
        );
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
