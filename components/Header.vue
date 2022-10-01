<template>
  <div class="bigheader">
    <div class="box-head">
        <h1 class="margined">
          <nuxt-link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
            ocular</nuxt-link>
            <span v-if="crumbs">
              <span v-for="crumb of crumbs" :key="crumb.link">
                <span class="bread"> / </span>
                <nuxt-link :to="crumb.link">{{ crumb.text }}</nuxt-link>
              </span>
            </span>
        </h1>
        <div class="margined">
          <nuxt-link to="/docs/about">about</nuxt-link> <span>|</span>
          <a href="https://github.com/jeffalo/ocular" class="header-link">github</a> <span class="full">|</span>
          <a href="https://scratchdb.lefty.one" class="header-link full">api and data from datonelefty</a>
          <div v-if="$auth.loggedIn()" class="header-user">
            <nuxt-link :to="`/user/${$auth.user().name}`">@{{ $auth.user().name }}</nuxt-link> <span>|</span> <nuxt-link :to="`/starred`">starred</nuxt-link> | <nuxt-link :to="`/dashboard`">dashboard</nuxt-link> | <a @click="logout()" class="logout">logout</a>
          </div>
        </div>
    </div>
  </div>
</template>
<style scoped>
.bigheader {
  margin-bottom: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
  border: none;
  border-radius: 0;
  background: var(--brand);
  color: white;
}

.bigheader h1 {
  font-size: 30px;
}

.bigheader a {
  color: white;
  font-weight: bold;
}

.icon {
  fill: white;
}

.bread {
  font-weight: lighter;
}

.header-user{
  float: right
}

.logout {
  cursor: pointer;
}
</style>

<script>
export default {
  props: ['crumbs'],
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout',)

      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
