<template>
  <div class="post">
    <div class="header">
      <PostTime :time="post.time.posted" :linkid="post.id" />
      <nuxt-link :to="`/topic/${post.topic.id}`" class="topic-link">{{
        post.topic.title
      }}</nuxt-link>
      <a
        :href="`https://scratch.mit.edu/discuss/post/${post.id}`"
        class="view-scratch"
        >view on scratch</a
      >
    </div>
    <div class="post-wrap">
      <section class="main-content">
        <div class="post-content" v-html="blockifiedContent"></div>
        <div class='post-footer'><span v-if="$auth.loggedIn()"><Star :post="post"/> | </span><a :href='`https://scratch.mit.edu/discuss/misc/?action=report&post_id=${post.id}`'>Report</a></div>
      </section>
      <nav class="main-nav">
        <nuxt-link :to="`/user/${post.username}`" class="username">{{
          post.username
        }}</nuxt-link>
        <nuxt-link :to="`/user/${post.username}`">
          <img
            :src="`https://fluffyscratch.hampton.pw/user/${post.username}/profile/picture`"
            width="90"
            height="90"
          />
        </nuxt-link>
        <span class="rank">Scratcher</span>
        <PostCount :user="post.username" />
        <Status :user="post.username" style="display: block;" />
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  computed: {
    blockifiedContent() {
      // adapted from https://github.com/scratchblocks/scratchblocks/blob/master/index.js
      let content = this.post.content.html
      let options = {
        style: "scratch2",
        inline: false,
        languages: ["en"],

        read: scratchblocks.read, // function(el, options) => code
        parse: scratchblocks.parse, // function(code, options) => doc
        render: scratchblocks.render, // function(doc) => svg
      }
      const parser = new DOMParser();

      const doc = parser.parseFromString(content, "text/html");

      let results = [].slice.apply(doc.querySelectorAll('pre.blocks:not(.scratchblockrendered)'))
      results.forEach(function(el) {
        var code = options.read(el, options)

        var parsed = options.parse(code, options)

        var svg = options.render(parsed, options)

        var container = doc.createElement("div")
        container.className = "scratchblocks"
        container.appendChild(svg)
        el.innerHTML = ""
        el.appendChild(container)
      })
      return doc.documentElement.innerHTML
    } 
  },
  async fetch() {
    let res = await fetch(`${process.env.backendURL}/api/starred/${this.post.id}`, {
      headers: {
        Authorization: this.$auth.token(),
        "Content-Type": "application/json",
      }
    })
    let data = await res.json()
    this.starred = data.starred
  },
  fetchOnServer: false
};
</script>

<style scoped>
.post {
  margin-bottom: 20px;
}

.post-wrap {
  display: flex;
  border: 1px solid var(--sidebar-border);
  border-left: none;
}

.main-content {
  order: 2;
  width: 85%;
  background: var(--background);
  overflow: hidden;
  display: flex;
  flex-flow: row wrap;
}

.post-content{
  display: block;
  width: 100%;
}

.main-nav {
  order: 1;
  width: 20%;
  flex: 1;
  background: var(--sidebar-background);
}

.main-content,
.main-sidebar,
.main-nav {
  padding: 0.5em 1em;
  box-shadow: inset 1px 0 var(--sidebar-border);
  overflow-wrap: break-word;
}

.post-footer{
  padding-top: 2em;
  align-self: flex-end;
  text-align: right;
  display: block;
  width: 100%;
}

.header {
  background-color: var(--brand);
  padding: 10px;
  font-weight: bold;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  white-space: nowrap;
}

.rank {
  display: block;
}

.view-scratch {
  float: right;
  color: white;
  text-decoration: none;
}

.date {
  color: white;
  text-decoration: none;
}

.topic-link {
  color: white;
  text-decoration: none;
  padding-left: 10px;
}

.topic {
  float: right;
  color: white;
  text-decoration: none;
}

.main-content >>> img {
  max-width: 100%;
  max-height: 100%;
}

.username {
  color: var(--text);
  font-weight: bold;
  padding-bottom: 5px;
  display: block;
}

.main-content >>> blockquote {
  margin: 12px 0;
  padding: 12px 20px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--quote-border);
  background-color: var(--quote-background);
}

.main-content >>> .bb-quote-author {
  color: var(--text-color);
  font-weight: bold;
}

.main-content >>> .bb-italic {
  font-style: italic;
}

.main-content >>> .bb-bold {
  font-weight: bold;
}

.main-content >>> .bb-small {
  font-size: 10px;
}

.main-content >>> .bb-big {
  font-size: 17px;
}

.main-content >>> .bb-strikethrough {
  text-decoration: line-through;
}

.main-content >>> .bb-underline {
  text-decoration: underline;
}
</style>