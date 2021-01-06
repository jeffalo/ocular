<template>
  <span class="container">
        <i class="status">{{ status }}</i>
        <span class="status-color" :style="`background-color: ${color}`" v-if="color"></span>
  </span>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      status: '',
      color: '',
    };
  },
  async fetch() {
    await fetch("https://my-ocular.jeffalo.net/api/user/"+this.user)
    .then((res) => res.json())
    .then(data=>{
        this.status = data.status
        this.color = data.color
    })
  },
  fetchOnServer: false
};
</script>

<style scoped>
.container{
    display: block;
}
.status-color{
    height: 10px;
    width: 10px;
    margin-left: 3px;
    background-color: rgb(32, 116, 57);
    border-radius: 50%;
    display: inline-block;
}
</style>