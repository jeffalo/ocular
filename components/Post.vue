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
      <section
        class="main-content"
        v-if="post.parser.version > 0"
        v-html="post.content.html"
      ></section>
      <section class="main-content" v-if="post.parser.version == 0">
        {{ post.content.bb }}
        <span class="xss-info">
          this post is displayed as raw bbcode for your saftey
          <nuxt-link to="/xss-info">(more info)</nuxt-link>
          <a href="javascript:void(0)" @click="post.parser.version = 1">
            (render anyway)
          </a>
        </span>
      </section>
      <nav class="main-nav">
        <nuxt-link :to="`/user/${post.username}`" class="username">{{
          post.username
        }}</nuxt-link>
        <nuxt-link :to="`/user/${post.username}`">
          <img
            :src="`https://fluffyscratch.hampton.pw/user/${post.username}/profile/picture`"
            id="profile-picture"
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
};
</script>

<style scoped>
.post {
  margin-bottom: 20px;
}

.post-wrap {
  display: flex;
  border: 1px solid #e0e0e0;
  border-left: none;
}

.main-content {
  order: 2;
  width: 85%;
  background: white;
  overflow: hidden;
}

.main-nav {
  order: 1;
  width: 20%;
  flex: 1;
  background: #f2f2f2;
}

.main-content,
.main-sidebar,
.main-nav {
  padding: 1em;
  padding-top: 0.5em;
  padding-bottom: 2em;
  box-shadow: inset 1px 0 #e0e0e0;
  overflow-wrap: break-word;
}

.header {
  background-color: #0fbd8c;
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
  color: #575e75;
  font-weight: bold;
  padding-bottom: 5px;
  display: block;
}

.main-content >>> blockquote {
  margin: 12px 0;
  padding: 12px 20px;
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
  background-color: #f7f7f7;
}

.main-content >>> .bb-quote-author {
  color: #575e75;
  font-weight: bold;
}

.main-content >>> .bb-italic {
  font-style: italic;
}

.main-content >>> .bb-bold {
  font-weight: bold;
}

.xss-info {
  margin-top: 20px;
  display: block;
  color: #8d96b3;
}

.xss-info a {
  color: #8d96b3;
}
</style>