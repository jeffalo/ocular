<template>
  <span>
    <span v-if="$auth.loggedIn() && $auth.user().admin">
      <form class="admin-reaction-form" @submit.prevent="customReaction()">
        <input
          class="admin-reaction-input"
          type="text"
          v-model="adminCustomReaction"
          placeholder="custom reaction"
        />
      </form>
    </span>
    <a
      v-for="reaction of filteredReactions"
      :key="reaction.emoji"
      class="reaction-button"
      :class="{
        selected:
          $auth.loggedIn() &&
          reaction.reactions.find((r) => r.user == $auth.user().name),
        loading,
      }"
      @click="react(post.id, reaction.emoji)"
      v-tooltip="reaction.reactions.map(r=>r.user).join(', ')"
      >{{ reaction.emoji }} {{ reaction.reactions.length }}</a
    >
    <v-popover
      placement="top"
      class="reactions-popover"
      v-if="$auth.loggedIn()"
    >
      <!-- This will be the popover target (for the events and position) -->
      <button class="open-reaction-popover">😀</button>
      <!-- This will be the content of the popover -->
      <div slot="popover">
        <a
          v-for="reaction of reactions"
          :key="reaction.emoji"
          class="reaction-button-popover"
          v-close-popover
          :class="{
            selected: reaction.reactions.find(
              (r) => r.user == $auth.user().name
            ),
            loading,
          }"
          @click="react(post.id, reaction.emoji)"
          >{{ reaction.emoji }}</a
        >
      </div>
    </v-popover>
  </span>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      reactions: [],
      adminCustomReaction: "",
      loading: false,
    };
  },
  computed: {
    filteredReactions() {
      return this.reactions.filter((r) => r.reactions.length > 0);
    },
  },
  methods: {
    async react(id, emoji) {
      this.loading = true;
      await this.$store.dispatch("auth/login", this.$auth.token()); // refresh user details
      if (this.$auth.user()) {
        let res = await fetch(`${process.env.backendURL}/api/reactions/${id}`, {
          method: "POST",
          headers: {
            Authorization: this.$auth.token(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emoji: emoji,
          }),
        });
        let data = await res.json();
        if (data.error) {
          alert(data.error);
        } else {
          this.reactions = data;
          this.loading = false;
        }
      } else {
        this.$router.push({
          path: "/login",
        });
      }
    },
    customReaction() {
      this.react(this.post.id, this.adminCustomReaction);
      this.adminCustomReaction = "";
    },
  },
  async fetch() {
    let res = await fetch(
      `${process.env.backendURL}/api/reactions/${this.post.id}`
    );
    let data = await res.json();
    this.reactions = Object.values(data);
  },
  fetchOnServer: false,
};
</script>

<style scoped>
.reaction-button {
  color: var(--text);
  cursor: pointer;
  user-select: none;
  background-color: var(--sidebar-background);
  margin: 0px 5px;
  padding: 4px;
  display: inline-block; /* don't wrap in the middle of a reaction */
  line-height: normal;
  border-radius: 6px;
  box-shadow: 0 0 2px var(--brand);
  opacity: 1;
  transition: opacity 500ms;
}

.reaction-button-popover {
  padding: 4px;
  color: white;
  margin: 4px;
  border-radius: 4px;
  cursor: pointer;
  opacity: 1;
  transition: opacity 500ms;
  user-select: none;
}

.reaction-button-popover:hover {
  opacity: 0.75;
}

.reaction-button-popover.selected {
  background-color: var(--brand);
}

.reaction-button.selected {
  color: white;
  background-color: var(--brand);
}

.reaction-button.loading {
  opacity: 0.5;
}

.open-reaction-popover {
  background: none;
  filter: grayscale();
  transition: filter 500ms;
  user-select: none;
}

.open .open-reaction-popover {
  filter: none;
}

.reactions-popover {
  display: inline;
}

.admin-reaction-form {
  display: inline-block;
}

.admin-reaction-input {
  width: 100px;
  border-radius: 5px;
  padding: 3px;
  border: 1px solid var(--input-border);
  background-color: var(--input-background);
  color: var(--text);
}
</style>