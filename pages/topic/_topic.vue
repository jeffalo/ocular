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
            category: <b><nuxt-link :to="`/browse/${category}`">{{ data.posts[0].topic.category }}</nuxt-link></b>
          </p>
        </div>
        <PostList :posts="data.posts" :loading="$fetchState.pending" @loadMore="loadMore()" :showLoadMore="showLoadMore"/>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import map from "@/assets/category-map.js";

function getKey(map, value) { // thanks https://stackoverflow.com/a/53313763/9918633
  return [...map].find(([key, val]) => val == value)[0]
}

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
      category: '',
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
    var postsRes = await fetch(
      `https://scratchdb.lefty.one/v3/forum/search/?q=%2Btopic%3A${this.topic}&page=${this.page}&o=oldest`
    );
    var postData = await postsRes.json();

    this.data = postData;
    this.category = getKey(map, postData.posts[0].topic.category) //get category id from name 
    this.showLoadMore = true
  },
  fetchOnServer: false,
};
</script>