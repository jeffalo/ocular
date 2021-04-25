<template>
  <span>
    <a :href="`/post/${linkid}`" class="date-full">{{ new Date(time) }}</a>
    <a :href="`/post/${linkid}`" class="date-mobile">{{ new Date(time).toLocaleDateString("en-US") + ' - ' + new Date(time).toLocaleTimeString("en-US") }}</a>
  </span>
</template>

<script>
export default {
  props: ["time", "linkid"],
  ssr: false,
};
</script>

<style scoped>
.date-full {
  color: white;
  text-decoration: none;
}
.date-mobile {
  color: white;
  text-decoration: none;
  display: none;
}

@media only screen and (max-width: 750px) {
  .date-full {
    display: none;
  }
  .date-mobile {
    display: inline;
  }
}
</style>