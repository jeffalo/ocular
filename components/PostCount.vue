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
    this.count = await fetch("https://scratchdb.lefty.one/v2/forum/user/info/"+this.user)
    .then((res) => res.json())
    .then(data=>{
        return data.counts.total.count
    })
  },
  fetchOnServer: false
};
</script>

<style scoped>
.post-count {
  display: block;
}
</style>