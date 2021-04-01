<template>
  <div class="container">
    <Header pageName="dashboard" pageLink="/dashboard" />
    <div class="margined">
      <h1>account dashboard</h1>
      <img
        :src="`https://fluffyscratch.hampton.pw/user/${$auth.user().name}/profile/picture`"
        width="30"
        height="30"
        class="dashboard-pfp"
      />
      <h2 class="dashboard-username">{{ $auth.user().name }}</h2>
      <nuxt-link :to="`/user/${$auth.user().name}`">(visit ocular profile)</nuxt-link>
      <a :href="`https://shefwerld.rirurin.com/post/user?user=${$auth.user().name}`" target="_blank" rel="noopener noreferrer">(view on scratch forum leaderboards ↗️)</a>
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
          <label for="status">status: </label><input name="status" type="text" class="input dashboard" v-model="status">
          <br>
          <label for="color">favourite colour: </label><input name="color" type="color" class="color-input" v-model="color">
          <br>
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
  data() {
    return {
      user: this.$auth.user().name,
      status: this.$auth.user().status,
      color: this.$auth.user().color,
      alerts: [],
      adminMessage: ''
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
    async adminFeedback() {
      // return info on what's going to happen when an admin presses update and match inputs with user data
      if(this.user !== '') {
        let res = await fetch(`${process.env.backendURL}/api/user/${this.user}?noReplace=true`)
        let data = await res.json()
        this.status = data.status || ''
        this.color = data.color || ''
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
