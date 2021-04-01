<template>
  <div class="container">
    <Header pageName="user list" pageLink="/dashboard/users" />
    <div class="margined">
      <client-only>
        <vue-good-table
        :columns="columns"
        :rows="rows"
        :pagination-options="{
          enabled: true
        }"
        :theme="$colorMode.value == 'dark' || $colorMode.value == 'catsunited' ? 'nocturnal' : ''"/>
      </client-only>
      <Footer />
      </div>
    </div>
</template>

<script>
export default {
  middleware: 'admin',
  data(){
    return {
      columns: [
        {
          label: 'internal id',
          field: '_id',
        },
        {
          label: 'name',
          field: 'name',
        },
        {
          label: 'status',
          field: 'status',
        },
        {
          label: 'color',
          field: 'color'
        },
        {
          label: 'admin?',
          field: 'admin'
        },
        {
          label: 'updated at',
          field: 'meta.updated'
        },
        {
          label: 'updated by',
          field: 'meta.updatedBy'
        },
      ],
      rows: [],
    };
  },
  async fetch() {
    let res = await fetch(`${process.env.backendURL}/api/users`, {
      method: "GET",
      headers: {
        Authorization: this.$auth.token(),
      },
    });
    let data = await res.json();
    this.rows = data
  }
};
</script>
