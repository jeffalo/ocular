<template>
  <div>
    <table cellspacing="0">
      <thead>
        <tr>
          <th class="tcl" scope="col">Topic</th>
          <th class="tc2" scope="col">Replies</th>
          <th class="tcr" scope="col">Last Post</th>
        </tr>
      </thead>
      <tbody>
        <TopicListItem v-for="topic in topics" :key="topic.id" :topic="topic" />
      </tbody>
    </table>
    <button @click="$emit('loadMore')" class="load-more" v-if="showLoadMore">Load More</button>
  </div>
</template>

<script>
export default {
  props: ["topics", "showLoadMore"],
};
</script>

<style scoped>
table {
  width: 100%;
}

thead tr th {
  background: var(--table-stripe);
  padding: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--input-border);
}

.load-more {
  margin-top: 20px;
}
</style>