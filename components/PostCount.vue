<template>
  <span class="post-count">{{ count || '0+' }} posts</span>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      count: 0,
    };
  },
  async fetch() {
    this.count = await this.$store.dispatch('counts/loadUser', {name: this.user})
  },
  fetchOnServer: false
};
</script>

<style scoped>
.post-count {
  display: block;
}
</style>