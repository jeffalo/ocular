<template>
  <a class="star-button" v-if="$auth.loggedIn()" :class="{ grayscale: !starred }" @click="star(post.id)">⭐</a>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      starred: false,
      stars: 0
    };
  },
  methods: {
    async star(id) {
      // toggle star state
      await this.$store.dispatch("auth/login", this.$auth.token()); // refresh user details
      if(this.$auth.user()){
        let res = await fetch(`${process.env.backendURL}/api/star/${id}`, {
          method: "POST",
          headers: {
            Authorization: this.$auth.token(),
            "Content-Type": "application/json",
          },
        });
        let data = await res.json();
        this.starred = data.starred;
        // this.stars = data.stars;
      }
    },
  },
  async fetch() {
    let res = await fetch(`${process.env.backendURL}/api/starred/${this.post.id}`, {
      headers: {
        Authorization: this.$auth.token(),
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    this.starred = data.starred;
    // this.stars = data.stars;
  },
  fetchOnServer: false,
};
</script>

<style scoped>
.star-button{
  font-weight: normal;
  cursor: pointer;
  user-select: none;
}

.star-button.grayscale{
  filter: grayscale()
}
</style>