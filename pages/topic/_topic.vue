<template>
  <div class="container">
    <Header :crumbs="[{ link: `/topic/${topic}`, text: 'topic' }]" />
    <div class="margined">
      <Loading v-if="$fetchState.pending" />
      <Error
        v-if="error"
        :error="error.title"
        :details="error.details"
        :fullwidth="true"
      />
      <div v-if="!$fetchState.pending">
        <div v-if="data.hits && data.hits[0]">
          <h1 style="display: inline-block">{{ data.hits[0].topic.title }}</h1>
          <p>
            id: <b>{{ data.hits[0].topic.id }}</b>
          </p>
          <p>
            category:
            <b
              ><nuxt-link :to="`/browse/${category}`">{{
                data.hits[0].topic.category
              }}</nuxt-link></b
            >
          </p>
        </div>
        <PostList
          :posts="data.hits"
          :loading="$fetchState.pending"
          @loadMore="loadMore()"
          :showLoadMore="showLoadMore"
          :op="op"
        />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import map from "@/assets/category-map.js";

function getKey(map, value) {
  // thanks https://stackoverflow.com/a/53313763/9918633
  return [...map].find(([key, val]) => val == value)[0];
}

export default {
  head() {
    return {
      title:
        this.data?.hits && this.data.hits[0]
          ? this.data.hits[0].topic.title
          : `topic id ${this.topic}`,
    };
  },
  data() {
    return {
      topic: this.$route.params.topic,
      page: 0,
      data: {},
      category: "",
      showLoadMore: false,
      error: null,
      op: "",
    };
  },
  methods: {
    async loadMore() {
      this.showLoadMore = false;
      this.page++;

      var postsRes = await fetch(
        `https://scratchdb.lefty.one/search/indexes/forum_posts/search?hitsPerPage=50&page=${
          this.page + 1
        }&sort=id:asc&filter=topic.id=${this.topic}`,
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
      var postData = await postsRes.json();
      this.data.hits.push(...postData.hits);

      this.showLoadMore = true;
    },
  },
  async fetch() {
    var postsRes = await fetch(
      `https://scratchdb.lefty.one/search/indexes/forum_posts/search?hitsPerPage=50&page=${
        this.page + 1
      }&sort=id:asc&filter=topic.id=${this.topic}`,
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
    var postData = await postsRes.json();

    this.data = postData;
    this.op = postData.hits[0].username;
    this.category = getKey(map, postData.hits[0].topic.category); //get category id from name
    this.showLoadMore = true;
  },
  fetchOnServer: false,
};
</script>

