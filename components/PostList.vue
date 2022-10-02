<template>
  <div>
    <Loading v-if="loading" />
    <div v-if="!loading">
      <Post
        v-for="post of posts"
        v-bind:key="post.id"
        v-bind:post="post"
      />
      <Error  v-if="posts && posts.length == 0" error="No posts found" details="Please try refining your query."></Error>
      <button @click="$emit('loadMore')" v-if="showLoadMore">Load More</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["posts", "loading", "showLoadMore"]
};
</script>
