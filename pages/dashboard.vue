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
          <label for="status">status: </label><input name="status" type="text" class="input dashboard" v-model="status">
          <br>
          <label for="color">favourite colour: </label><input name="color" type="color" class="color-input" v-model="color">
          <br>
          <button type="submit" class="update-btn">update</button>
      </form>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  data() {
    return {
      status: this.$auth.user().status,
      color: this.$auth.user().color,
      alerts: []
    }
  },
  methods: {
    async updateUser() {
      await this.$store.dispatch("auth/login", this.$auth.token()); // refresh user details
      if(this.$auth.user()){
        let res = await fetch(
          `${process.env.backendURL}/api/user/${this.$auth.user().name}`,
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

        this.$store.commit("statuses/removeUser", {name: this.$auth.user().name}) // remove user from ocular cache so they'll see real status

        if(data){
          if(!data.error) {
            this.alerts.push({
              body: data.ok,
              type: 'success'
            })
          } else {
            this.alerts.push({
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