<template>
  <div>
    <Loading v-if="loading" />
    <div v-if="!loading">
      <Post
        v-for="post of posts"
        v-bind:key="post.id"
        v-bind:post="post"
      />
      <div v-if="posts.length == 0">
        <p>No posts found, please try refining your query.</p>
      </div>
      <button @click="$emit('loadMore')" v-if="showLoadMore">Load More</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["posts", "loading", "showLoadMore"]
};
</script>
