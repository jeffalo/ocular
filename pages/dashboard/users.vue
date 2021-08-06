<template>
  <div class="container">
    <Header :crumbs="[{link:'/dashboard', text:'dashboard'}, {link:'/dashboard/users', text:'users'}]" />
    <div class="margined">
      <client-only>
      <div class="unsaved-changes"  :style="{ opacity: changed.includes(true) ? 1 : 0 }">
        You have unsaved changes. <button @click="saveChanges()">Save</button>
        </div>
        <vue-good-table
        :columns="columns"
        :rows="rows"
        :pagination-options="{ enabled: true }"
        :search-options="{ enabled: true }"
        :theme="$colorMode.value == 'dark' || $colorMode.value == 'catsunited' || $colorMode.value == 'classic-dark' ? 'nocturnal' : ''"
        >
          <template v-slot:table-row="{ row, column, formattedRow }">
            <span v-if="column.field === 'status'">
              <div
                contenteditable
                class="status-edit"
                @blur="statusChanged(row.originalIndex, $event.target.innerText)"
              >
                {{ row.status }}
              </div>
            </span>
            <span v-else-if="column.field === 'color'">
              <input type="color" :value="row.color" @change="updateColor(row.originalIndex, $event.target.value)" /> 
              {{ row.color }}
            </span>
            <span v-else-if="column.field === 'banned'">
              <input type="checkbox" :checked="row.banned" @change="setBanned(row.originalIndex, $event.target.checked)"/> 
              {{ !!row.banned }}
            </span>
            <span v-else>
              {{ formattedRow[column.field] }}
            </span>
          </template>
        </vue-good-table>
      </client-only>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'admin',
  head: {
    title: 'user list'
  },
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
          label: 'banned?',
          field: 'banned'
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
      changed: []
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
    this.rows = data;
    this.changed = Array.from({ length: data.length }).fill(false);
   //alert(JSON.stringify(data));
  },
  methods: {
    updateChanged (index, value) {
      this.$set(this.changed, index, value);
    },
    statusChanged(index, status) {
      if (status === this.rows[index].status) {
        return;
      }
      this.$set(this.rows[index], "status", status);
      this.updateChanged(index, true);
    },
    updateColor(index, color) {
      if (color === this.rows[index.color]) return;
      this.$set(this.rows[index], "color", color);
      this.updateChanged(index, true);
    },
    setBanned(index, banned) {
      if (!!banned === !!this.rows[index].banned) return;
      this.$set(this.rows[index], "banned", banned);
      this.updateChanged(index, true);
    },
    async saveChanges() {
      await this.$store.dispatch("auth/login", this.$auth.token()); // refresh user details
      if(this.$auth.user()){
        for (const index in this.changes.filter(a => a)) {
          let user = this.rows[index];
          let res = await fetch(
          `${process.env.backendURL}/api/user/${user.name}`,
            {
              method: "PUT",
              headers: {
                Authorization: this.$auth.token(),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: user.status,
                color: user.color,
                banned: user.banned
              }),
            }
          );

          let data = await res.json();

          this.$store.commit("statuses/removeUser", { name: user.name }) // remove user from ocular cache so they'll see real status

          if(data) {
            if(!data.error) {
              alert(data.ok)
            } else {
              alert(data.error)
            }
          }
        }
      } else {
        this.$router.push({
          path: '/login'
        });
      }
    }
  },
};
</script>

<style scoped>
  div.status-edit {
    border: dashed 1px var(--input-border);
    background: var(--input-background);
    color: var(--text);
    padding: 4px;
  }
  div.unsaved-changes {
    position: sticky;
    top: 0;
    z-index: 99;
    width: 100%;
    background: var(--background);
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
    transition: opacity 0.5s;
  }
</style>
