<template>
  <div>
    <Loading v-if="loading" />
    <div v-if="!loading">
      <Post
        v-for="post of posts"
        v-bind:key="post.id"
        v-bind:post="post"
      />
      <button @click="$emit('loadMore')" v-if="showLoadMore">Load More</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["posts", "loading", "showLoadMore"]
};
</script>