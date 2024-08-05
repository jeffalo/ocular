<template>
  <div class="container">
    <Header :crumbs="[{ link: `/user/${user}`, text: 'user' }]" />
    <div class="margined">
      <Loading v-if="$fetchState.pending" />
      <div v-if="!$fetchState.pending">
        <h1 class="user-name">{{ user }}</h1>
        <h3 class="view-scratch">
          <a
            :href="`https://scratch.mit.edu/users/${user}`"
            class="view-scratch"
            >scratch profile</a
          >
        </h3>
        <Status :user="user" class="user-status" />
        <details class="signature-spoiler">
          <summary>signature</summary>
          <div class="signature">
            <Render v-if="info.signature" :content="info.signature" />
          </div>
        </details>
        <h2>{{ user }}'s posts</h2>
        <PostList
          :posts="posts"
          :loading="$fetchState.pending"
          @loadMore="loadMore()"
          :showLoadMore="showLoadMore"
        />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.user}'s scratch forum posts`,
    };
  },
  data() {
    return {
      user: this.$route.params.username,
      page: 0,
      posts: {},
      info: {},
      showLoadMore: false,
    };
  },
  methods: {
    async loadMore() {
      this.showLoadMore = false;
      this.page++;

      var postsRes = await fetch(
        `https://scratchdb.lefty.one/search/indexes/forum_posts/search?hitsPerPage=50&page=${
          this.page + 1
        }&sort=id:desc&filter=username=${this.user}`,
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
      this.posts.push(...postData.hits);

      this.showLoadMore = true;
    },
  },
  async fetch() {
    var postsRes = await fetch(
      `https://scratchdb.lefty.one/search/indexes/forum_posts/search?hitsPerPage=50&page=${
        this.page + 1
      }&sort=id:desc&filter=username=${this.user}`,
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

    this.posts = postData.hits;
    this.showLoadMore = true;
  },
  fetchOnServer: false,
};
</script>

<style scoped>
.signature-spoiler {
  margin-bottom: 15px;
  padding: 12px 20px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--quote-border);
  background-color: var(--quote-background);
}

.signature-spoiler summary {
  cursor: pointer;
}

.signature-spoiler .signature {
  margin-top: 10px;
}

.user-name {
  display: inline-block;
}

.user-status {
  display: inline-block;
}

.view-scratch {
  float: right;
  text-decoration: none;
  display: inline-block;
}
</style>

