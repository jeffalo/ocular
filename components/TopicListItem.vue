<template>
  <tr>
    <td class="title">
      <div>
        <span>
          <nuxt-link :to="`/topic/${topic.id}/`">{{ topic.title }}</nuxt-link>
        </span>
        <span>by {{ topic.first_post.username }}</span>
      </div>
    </td>
    <td class="replies">{{ topic.post_count }}</td>
    <td>
      <nuxt-link :to="`/post/${topic.last_post.id}`">
        <TopicTime :time="topic.last_post.time.posted" />
      </nuxt-link>
      <span> by {{ topic.last_post.username }} </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["topic"],
};
</script>

<style scoped>
.replies {
  text-align: center;
  background: var(--table-stripe);
}

.title {
  padding-left: 20px;
  padding-right: 20px;
}

td,th {
  border-style: solid;
  border-width: 1px;
  border-color: var(--input-border);
}

td {
  padding: 8px 6px;
}

td span {
  overflow-wrap: break-word;
  word-break: break-word;
}
</style>