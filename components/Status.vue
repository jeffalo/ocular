<template>
  <span class="container">
    <i class="status">{{ status }}</i>
    <span
      class="status-color"
      :style="`background-color: ${color}`"
      v-if="color"
    ></span>
  </span>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      status: "",
      color: "",
    };
  },
  async fetch() {
    let data = await this.$store.dispatch('statuses/loadUser', {name: this.user})
    if (data.status) {
      this.status = data.status;
      this.color = data.color;
    }
  },
  fetchOnServer: false,
};
</script>

<style scoped>
.status-color {
  height: 10px;
  width: 10px;
  margin-left: 3px;
  background-color: rgb(32, 116, 57);
  border-radius: 50%;
  display: inline-block;
}
</style>