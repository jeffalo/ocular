<template>
  <div class="container">
    <Header pageName="search" pageLink="/search" />
    <div class="margined">
      <h1>search</h1>
      <form method="get">
        <input
          required
          name="q"
          type="text"
          placeholder="search query"
          id="searchbox"
          class="sb"
          :value="$route.query.q"
        />
        <select
          name="sort"
          id="sorting"
          :value="$route.query.sort || 'relevance'"
        >
          <option value="relevance">relevance</option>
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
        </select>
        <button type="submit" class="sbb">go</button>
      </form>
      <div v-show="splash">
        <h1>how to use</h1>
        <h2>searching</h2>
        <p>searches from scratchdb use a pretty neat format.</p>
        <p>
          each requirement is in the format <code>+requirement:"value"</code>,
          if you don't include a requirement it's assumed you mean content
        </p>

        <p>
          prefix a requirement with <code>+</code> to require it to be true,
          <code>-</code> to require it to be false and <code>~</code> if it
          should be true, but is not required
        </p>

        <table class="info">
          <thead>
            <tr>
              <th>Requirement</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>username</td>
              <td>requires that the resulting posts be by a certain user</td>
            </tr>
            <tr>
              <td>category</td>
              <td>
                requires that the resulting posts be in a category (this does
                not have to be complete, +category:"Advanced" will match
                Advanced Topics)
              </td>
            </tr>
            <tr>
              <td>topic</td>
              <td>
                requires that the resulting posts be from a topic with the id
              </td>
            </tr>
            <tr>
              <td>title</td>
              <td>
                requires that the resulting posts be from a topic with a topic
                title (this does not have to be complete, +title:"help" will
                match anything with help in the title.)
              </td>
            </tr>
            <tr>
              <td>id</td>
              <td>requires that the resulting post has an id</td>
            </tr>
            <tr>
              <td>content</td>
              <td>
                requres that the resulting posts have this in their content
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <h2>other</h2>
        <p><code>/user/:username</code> will show posts by the user</p>
        <p><code>/topic/:topic</code> will show posts in a topic by id</p>
        <p><code>/post/:post</code> will show a single post by id</p>
      </div>
      <div v-show="!splash">
        <Loading v-if="$fetchState.pending" />
        <div v-if="!$fetchState.pending">
          <Post
            v-for="post of posts.posts"
            v-bind:key="post.id"
            v-bind:post="post"
          />
          <button @click="loadMore()">Load More</button>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.sb {
  width: 600px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid var(--input-border);
  background-color: var(--input-background);
  color: var(--text);
  margin-bottom: 0.5em;
}

select {
  width: 120px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid var(--input-border);
  background-color: var(--input-background);
  color: var(--text);
  margin-bottom: 0.5em;
}

.sbb {
  border-radius: 5px;
  padding: 10px;
  border: 1px solid var(--input-border);
  margin-bottom: 0.5em;
  line-height: normal;
}

.info {
  border-collapse: collapse;
  width: 100%;
}

.info td,
.info th {
  border: 1px solid var(--table-border);
  padding: 8px;
}

.info tr:nth-child(even) {
  background-color: var(--table-stripe);
  transition: 250ms;
}

.info tr:nth-child(odd) {
  background-color: var(--background);
  transition: 250ms;
}

.info tr:hover {
  background-color: var(--table-hover);
}

.info th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: var(--brand);
  color: white;
}

@media only screen and (max-width: 1100px) {
  .sb {
    width: 200px;
  }
}
</style>
<script>
export default {
  ssr: true,
  watch: {
    "$route.query": "$fetch",
  },
  data() {
    return {
      search: encodeURIComponent(decodeURIComponent(this.$route.query.q)),
      sort: encodeURIComponent(decodeURIComponent(this.$route.query.sort)),
      topic: encodeURIComponent(decodeURIComponent(this.$route.query.topic)),
      post: encodeURIComponent(decodeURIComponent(this.$route.query.post)),
      showLoadMore: false,
      page: 0,
      posts: {},
      splash: false,
      ssr: true,
    };
  },
  methods: {
    async loadMore() {
      this.page++;
      var res = await fetch(
        `https://scratchdb.lefty.one/v3/forum/search/?q=${this.search}&o=${this.sort}&page=${this.page}`
      );

      var data = await res.json();
      this.posts.posts.push(...data.posts);
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
    if (this.search !== "undefined") {
      this.showLoadMore = true;
      this.posts = await fetch(
        `https://scratchdb.lefty.one/v3/forum/search/?q=${this.search}&o=${this.sort}&page=${this.page}`
      ).then((res) => res.json());
      this.splash = false;
      return;
    }

    this.splash = true;
  },
  fetchOnServer: false,
};
</script>