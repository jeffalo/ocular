<template>
  <div class="post">
    <div class="header">
      <PostTime :time="post.time_posted" :linkid="post.id" />
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
        <Render class="post-content" :content="post.content" />
        <p v-if="post.time_last_edited" class="last-edited">
          Last edited by {{ post.last_edited_by }} ({{ post.time_last_edited }})
        </p>
        <div class="post-footer">
          <ReactionButtons :post="post" /> |
          <span v-if="$auth.loggedIn()"> <Star :post="post" /> | </span
          ><a
            target="_blank"
            :href="`https://scratch.mit.edu/discuss/misc/?action=report&post_id=${post.id}`"
            >Report</a
          >
        </div>
      </section>
      <nav class="main-nav">
        <nuxt-link :to="`/user/${post.username}`" class="username"
          >{{ post.username }}
          <p
            v-if="isOP"
            class="op-badge"
            title="Original poster (creator of this topic)"
          >
            OP
          </p></nuxt-link
        >
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
        <Status :user="post.username" style="display: block" />
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post", "isOP"],
  data() {
    return {
      backendURL: process.env.backendURL,
    };
  },
  async fetch() {
    let res = await fetch(
      `${process.env.backendURL}/api/starred/${this.post.id}`,
      {
        headers: {
          Authorization: this.$auth.token(),
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    this.starred = data.starred;
  },
  fetchOnServer: false,
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

.post-content {
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

.username {
  color: var(--text);
  font-weight: bold;
  padding-bottom: 5px;
  display: block;
}

.last-edited {
  padding-top: 15px;
  color: var(--footer-text);
}

.op-badge {
  display: inline-block;
  padding: 3px 4px;
  background: var(--brand);
  color: var(--text);
  border-radius: 5px;
  line-height: 1em;
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

