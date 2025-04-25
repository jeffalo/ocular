<template>
  <div class="container">
    <Header :crumbs="[{ link: '/search', text: 'search' }]" />
    <div class="margined">
      <h1>search</h1>
      <form method="get">
        <input
          required
          name="q"
          type="text"
          placeholder="search query"
          ref="searchbox"
          class="input"
          v-model="search"
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
        <button type="submit" class="form-button">go</button>
        <details :open="filterOpen">
          <summary>Filtering</summary>
          <input
            type="text"
            ref="filteringbox"
            :name="boundFilter ? 'filter' : ''"
            v-model="boundFilter"
            class="input"
            placeholder="post_number = 1"
          />
          <div class="speed">
            speed:
            <button type="button" @click="addParameter('username')">
              written by
            </button>
            <button type="button" @click="addParameter('last_edited_by')">
              edited by
            </button>
            <button type="button" @click="addParameter('topic.category')">
              in category
            </button>
            <button type="button" @click="addParameter('time_posted')">
              time posted
            </button>
          </div>
        </details>
      </form>
      <!--<div v-show="splash">
        <h2>search parameters</h2>
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
                requires that the resulting posts have this in their content
              </td>
            </tr>
            <tr>
              <td>closed</td>
              <td>
                specifies whether the containing topics are closed. use "1" to
                only get posts in topics that are closed, and "0" to get posts
                only in topics that are open
              </td>
            </tr>
            <tr>
              <td>status</td>
              <td>
                requires the poster to be a member of the matching group (for
                example, +status:"Scratch Team" returns only posts from the
                scratch team)
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
       -->
      <div v-show="splash">
        <h2>ocular search</h2>
        <p>⚠️ expect to see some broken-ness!</p>
        <p>
          this is a simplified version of ocular search to replace the old
          broken one that depended on scratchdb v3. it is missing features (and
          has an incomplete database), but at least it works.
        </p>
        <p>watch this space for improvements!</p>
      </div>
      <div v-show="!splash">
        <Error v-if="error" :error="error.title" :details="error.details" />
        <PostList
          :posts="data.hits"
          :loading="$fetchState.pending"
          @loadMore="loadMore()"
          :showLoadMore="showLoadMore"
        />
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
details {
  background-color: var(--input-background);
  width: max-content;
  border-width: 1px;
  border-style: solid;
  border-color: var(--quote-border);
  border-radius: 5px;
  margin: 1em 0;
  padding: 0 1.5em;
}

summary {
  cursor: pointer;
  margin: 1.5em 0;
}

.speed {
  margin-bottom: 2em;
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

@media only screen and (max-width: 800px) {
  .input {
    width: 200px;
  }
}
</style>
<script>
export default {
  head: {
    title: "scratch forum search",
  },
  ssr: true,
  watch: {
    "$route.query": "$fetch",
  },
  data() {
    return {
      search: encodeURIComponent(decodeURIComponent(this.$route.query.q || "")),
      boundFilter: this.$route.query.filter,
      filter: this.$route.query.filter
        ? `&filter=${encodeURIComponent(
            decodeURIComponent(this.$route.query.filter)
          )}`
        : "",
      filterOpen: !!this.$route.query.filter,
      sort:
        this.$route.query.sort == "newest"
          ? "&sort=id:desc"
          : this.$route.query.sort == "oldest"
          ? "&sort=id:asc"
          : "",
      showLoadMore: false,
      page: 0,
      data: {},
      splash: false,
      ssr: true,
      error: null,
    };
  },
  methods: {
    async loadMore() {
      this.showLoadMore = false;
      this.page++;

      var res = await fetch(
        `https://scratchdb.lefty.one/search/indexes/forum_posts/search?attributesToSearchOn=content&hitsPerPage=50&q=${
          this.search
        }&page=${this.page + 1}${this.sort}${this.filter}`,
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

      var data = await res.json();
      this.data.hits.push(...data.hits);

      this.showLoadMore = true;
    },
    addParameter(param) {
      let box = this.$refs.filteringbox;
      box.value += `${box.value.length == 0 ? "" : " AND "}${param} = ""`;
      box.focus();
      box.setSelectionRange(box.value.length - 1, box.value.length - 1);
    },
  },
  async fetch() {
    if (this.search) {
      let that = this;
      this.data = await fetch(
        `https://scratchdb.lefty.one/search/indexes/forum_posts/search?attributesToSearchOn=content&hitsPerPage=50&q=${this.search}${this.sort}${this.filter}`,
        {
          headers: {
            authorization:
              "Bearer 3396f61ef5b02abf801096be5f0b0ee620de304dd92fc6045aeb99539cd0bec4",
          },
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          this.error = {
            title: "Network Error",
            details: "Failed to connect to ScratchDB.",
          };
          return { posts: [] };
        });
      if (this.data.message) {
        return (this.error = {
          title: "Search error",
          details: this.data.message,
        });
      }
      this.splash = false;
      this.showLoadMore = true;
      return;
    }

    this.splash = true;
  },
  fetchOnServer: false,
};
</script>
