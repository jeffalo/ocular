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
        <div class='post-footer'><span v-if="$auth.loggedIn()"><ReactionButtons :post="post"/> | <Star :post="post"/> | </span><a :href='`https://scratch.mit.edu/discuss/misc/?action=report&post_id=${post.id}`'>Report</a></div>
      </section>
      <nav class="main-nav">
        <nuxt-link :to="`/user/${post.username}`" class="username">{{
          post.username
        }}</nuxt-link>
        <nuxt-link :to="`/user/${post.username}`">
          <img
            :src="`${backendURL}/api/user/${post.username}/picture`"
            width="90"
            height="90"
            class="pfp"
          />
        </nuxt-link>
        <!-- <span class="rank">Scratcher</span> -->
        <PostCount :user="post.username" />
        <Status :user="post.username" style="display: block;" />
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      backendURL: process.env.backendURL
    }
  },
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
  width: 15%;
  flex: 0 0 auto;
  background: var(--sidebar-background);
}

.main-content,
.main-sidebar,
.main-nav {
  padding: 0.75em 1em;
  box-shadow: inset 1px 0 var(--sidebar-border);
  overflow-wrap: break-word;
}

.pfp {
  width: 90px;
  height: 90px;
}

.post-footer {
  line-height: 28px;
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

.main-content >>> .code {
  margin: 12px 0;
  padding: 12px 20px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--quote-border);
  background-color: var(--quote-background);
  overflow: auto;
  max-height: 450px;
}

.main-content >>> .code pre {margin: 0}

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

@media only screen and (max-width: 750px) {
  .pfp {
    width: 75%;
    height: auto;
  }
  .main-nav {
    width: 20%;
  }
}
</style>

<style scoped> /* code highlighting i am so sorry to future me */
.main-content >>> .hll { background-color: #ffffcc }
.main-content >>> .c { color: #408080; font-style: italic } /* Comment */
.main-content >>> .main-content >>> .err { border: 1px solid #FF0000 } /* Error */
.main-content >>> .k { color: #008000; font-weight: bold } /* Keyword */
.main-content >>> .o { color: #666666 } /* Operator */
.main-content >>> .cm { color: #408080; font-style: italic } /* Comment.Multiline */
.main-content >>> .cp { color: #BC7A00 } /* Comment.Preproc */
.main-content >>> .c1 { color: #408080; font-style: italic } /* Comment.Single */
.main-content >>> .cs { color: #408080; font-style: italic } /* Comment.Special */
.main-content >>> .gd { color: #A00000 } /* Generic.Deleted */
.main-content >>> .ge { font-style: italic } /* Generic.Emph */
.main-content >>> .gr { color: #FF0000 } /* Generic.Error */
.main-content >>> .gh { color: #000080; font-weight: bold } /* Generic.Heading */
.main-content >>> .gi { color: #00A000 } /* Generic.Inserted */
.main-content >>> .go { color: #808080 } /* Generic.Output */
.main-content >>> .gp { color: #000080; font-weight: bold } /* Generic.Prompt */
.main-content >>> .gs { font-weight: bold } /* Generic.Strong */
.main-content >>> .gu { color: #800080; font-weight: bold } /* Generic.Subheading */
.main-content >>> .gt { color: #0040D0 } /* Generic.Traceback */
.main-content >>> .kc { color: #008000; font-weight: bold } /* Keyword.Constant */
.main-content >>> .kd { color: #008000; font-weight: bold } /* Keyword.Declaration */
.main-content >>> .kn { color: #008000; font-weight: bold } /* Keyword.Namespace */
.main-content >>> .kp { color: #008000 } /* Keyword.Pseudo */
.main-content >>> .kr { color: #008000; font-weight: bold } /* Keyword.Reserved */
.main-content >>> .kt { color: #B00040 } /* Keyword.Type */
.main-content >>> .m { color: #666666 } /* Literal.Number */
.main-content >>> .s { color: #BA2121 } /* Literal.String */
.main-content >>> .na { color: #7D9029 } /* Name.Attribute */
.main-content >>> .nb { color: #008000 } /* Name.Builtin */
.main-content >>> .nc { color: #0000FF; font-weight: bold } /* Name.Class */
.main-content >>> .no { color: #880000 } /* Name.Constant */
.main-content >>> .nd { color: #AA22FF } /* Name.Decorator */
.main-content >>> .ni { color: #999999; font-weight: bold } /* Name.Entity */
.main-content >>> .ne { color: #D2413A; font-weight: bold } /* Name.Exception */
.main-content >>> .nf { color: #0000FF } /* Name.Function */
.main-content >>> .nl { color: #A0A000 } /* Name.Label */
.main-content >>> .nn { color: #0000FF; font-weight: bold } /* Name.Namespace */
.main-content >>> .nt { color: #008000; font-weight: bold } /* Name.Tag */
.main-content >>> .nv { color: #19177C } /* Name.Variable */
.main-content >>> .ow { color: #AA22FF; font-weight: bold } /* Operator.Word */
.main-content >>> .w { color: #bbbbbb } /* Text.Whitespace */
.main-content >>> .mf { color: #666666 } /* Literal.Number.Float */
.main-content >>> .mh { color: #666666 } /* Literal.Number.Hex */
.main-content >>> .mi { color: #666666 } /* Literal.Number.Integer */
.main-content >>> .mo { color: #666666 } /* Literal.Number.Oct */
.main-content >>> .sb { color: #BA2121 } /* Literal.String.Backtick */
.main-content >>> .sc { color: #BA2121 } /* Literal.String.Char */
.main-content >>> .sd { color: #BA2121; font-style: italic } /* Literal.String.Doc */
.main-content >>> .s2 { color: #BA2121 } /* Literal.String.Double */
.main-content >>> .se { color: #BB6622; font-weight: bold } /* Literal.String.Escape */
.main-content >>> .sh { color: #BA2121 } /* Literal.String.Heredoc */
.main-content >>> .si { color: #BB6688; font-weight: bold } /* Literal.String.Interpol */
.main-content >>> .sx { color: #008000 } /* Literal.String.Other */
.main-content >>> .sr { color: #BB6688 } /* Literal.String.Regex */
.main-content >>> .s1 { color: #BA2121 } /* Literal.String.Single */
.main-content >>> .ss { color: #19177C } /* Literal.String.Symbol */
.main-content >>> .bp { color: #008000 } /* Name.Builtin.Pseudo */
.main-content >>> .vc { color: #19177C } /* Name.Variable.Class */
.main-content >>> .vg { color: #19177C } /* Name.Variable.Global */
.main-content >>> .vi { color: #19177C } /* Name.Variable.Instance */
.main-content >>> .il { color: #666666 } /* Literal.Number.Integer.Long */
</style>