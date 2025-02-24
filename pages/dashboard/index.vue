<template>
  <div class="container">
    <Header :crumbs="[{link:'/dashboard', text:'dashboard'}]" />
    <div class="margined">
      <h1>account dashboard</h1>
      <img
        :src="`${backendURL}/api/user/${$auth.user().name}/picture`"
        width="30"
        height="30"
        class="dashboard-pfp"
      />
      <h2 class="dashboard-username">{{ $auth.user().name }}</h2>
      <nuxt-link :to="`/user/${$auth.user().name}`">(visit ocular profile)</nuxt-link>
      <a :href="`https://postpercent.rirurin.com/users/${$auth.user().name}`" target="_blank" rel="noopener noreferrer">(view on postpercent ↗️)</a>
      <div v-for="(alert, index) in alerts" :key="`alert-${index}`">
        <div :class="`alert ${alert.type}`" v-if="alert.body">
          {{ alert.body }}
        <span class="close-btn" @click="alert.body = ''">x</span>
      </div>
      </div>
      <form @submit.prevent="updateUser()">
          <div v-if="$auth.user().admin">
            <label for="user">user: </label><input name="user" type="text" class="input dashboard" autocomplete="off" v-model="user">
            <br>
            {{ adminMessage }}
          </div>
          <label for="status">status: </label><input name="status" type="text" class="input dashboard" maxlength="300" v-model="status">
          <br>
          <label for="color">favourite colour: </label><input name="color" type="color" class="color-input" v-model="color">
          <br>
          <p>ocular statuses must follow <a href="https://scratch.mit.edu/community_guidelines">Scratch's community guidelines</a>.</p>
          <br>
          <div v-if="$auth.user().admin">
            <label for="banned">banned: </label><input type="checkbox" name="banned" v-model="banned">
            <br><br>
            <a href="#" @click="deleteUser()">⚠ delete this user's data</a><br>
          </div>
          <button type="submit" class="update-btn">update</button>
      </form>
      <br>
      <nuxt-link to="/dashboard/users" v-if="$auth.user().admin">user list</nuxt-link>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  head: {
    title: 'dashboard'
  },
  data() {
    return {
      user: this.$auth.user().admin ? (this.$route.query.name || this.$auth.user().name) : this.$auth.user().name,
      status: this.$auth.user().status,
      color: this.$auth.user().color,
      banned: this.$auth.user().banned,
      alerts: [],
      backendURL: process.env.backendURL,
      adminMessage: ''
    }
  },
  async fetch () {
    if (this.user !== this.$auth.user().name) {
      const userInfo = await (await fetch(`${this.backendURL}/api/user/${this.user}?noReplace=true`)).json();
      ({
        status: this.status, color: this.color, banned: this.banned
      } = userInfo);
    }
  },
  watch: {
    user: function(username) {
      this.adminFeedback()
    }
  },
  methods: {
    async updateUser() {
      await this.$store.dispatch("auth/login", this.$auth.token()); // refresh user details
      if(this.$auth.user()){
        let res = await fetch(
          `${process.env.backendURL}/api/user/${this.user}`,
          {
            method: "PUT",
            headers: {
              Authorization: this.$auth.token(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: this.status,
              color: this.color,
              banned: this.banned
            }),
          }
        );

        let data = await res.json()

        this.$store.commit("statuses/removeUser", {name: this.user}) // remove user from ocular cache so they'll see real status

        if(data){
          if(!data.error) {
            this.alerts.unshift({
              body: data.ok,
              type: 'success'
            })
          } else {
            this.alerts.unshift({
              body: data.error,
              type: 'error'
            })
          }
        }
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    async deleteUser() {
      if(confirm(`are you sure you want to delete all data for ${this.user}?`) && confirm("do you know what you're doing? theres like one use case for this and its really rare. pressing [OK] will delete all of this user's data with no way to go back.")) {
        let res = await fetch(`${process.env.backendURL}/api/user/${this.user}`, {
          method: "DELETE",
          headers: {
            Authorization: this.$auth.token(),
            "Content-Type": "application/json",
          }
        });

        let data = await res.json()

        this.$store.commit("statuses/removeUser", {name: this.user}) // remove user from ocular cache

        if(data){
          if(!data.error) {
            this.alerts.unshift({
              body: data.ok,
              type: 'success'
            })
          } else {
            this.alerts.unshift({
              body: data.error,
              type: 'error'
            })
          }
        }
      }    
    },
    async adminFeedback() {
      // return info on what's going to happen when an admin presses update and match inputs with user data
      if(this.user !== '') {
        let res = await fetch(`${process.env.backendURL}/api/user/${this.user}?noReplace=true`)
        let data = await res.json()
        this.status = data.status || ''
        this.color = data.color || ''
        this.banned = data.banned || false
        if(!data._id) {
          this.adminMessage = `${this.user} does not have an ocular account. this will create a new one for them`
        } else {
          this.adminMessage = ''
        }
      } else {
        this.status = ''
        this.color = ''
        this.adminMessage = 'you need to put in a username lol'
      }
    }
  },
};
</script>

<style scoped>
/* .color.input {

} */
.dashboard-username{
  display: inline-block;
}
.dashboard-pfp{
  border-radius: 50%;
  display: inline-block;
}

.update-btn{
  margin-top: 15px;
}
</style>
