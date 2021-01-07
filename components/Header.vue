<template>
  <div class="bigheader">
    <div class="box-head">
        <h1 class="margined">
          <nuxt-link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
            ocular</nuxt-link><span v-if="pageLink"><span class="bread"> / </span><a :href="pageLink">{{ pageName }}</a></span>
        </h1>
        <p class="margined">
          <a href="https://github.com/jeffalo/ocular" class="header-link">feedback</a> |
          <a href="https://scratchdb.lefty.one" class="header-link">api and data from datonelefty</a>
        </p>
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
  background: #0fbd8c;
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
</style>

<script>
export default {
  props: ['pageName', 'pageLink']
}
</script>