<template>
  <div class="container">
    <Header :crumbs="[{link:'/confirm-login', text:'login confirmation'}]"/>
    <div class="margined">
        <h1>login as {{name}}</h1>
        <img :src="`${backendURL}/api/user/${name}/picture`"
            width="50"
            height="50"
            class="confirm-pfp"
        />
        <p>logging in will allow you to customize your ocular profile, save posts for later and more</p>
        <button @click="confirm">confirm</button>
        <button class="deny-button" @click="deny">deny</button>
      <Footer />
    </div>
  </div>
</template>

<script>
import cookies from 'js-cookie'
export default {
    middleware: 'notauthenticated',
    head: {
        title: 'confirm login'
    },
    data() {
        return {
            name: '',
            token: '',
            oneTimeToken: this.$route.query.token,
            backendURL: process.env.backendURL
        }
    },
    methods: {
        async confirm(){
            cookies.set('my-ocular-token', this.token, { expires: new Date(253402300000000) })
            await this.$store.dispatch('auth/login', this.token)
            this.$router.push({
                path: '/'
            })
        },
        async deny(){
            let res = await fetch(`${process.env.backendURL}/auth/remove/?token=${this.token}`, {
                method: "POST"
            })
            let data = await res.json()
            console.log(data)
            if(data.error){
                console.warn(data.error)
            } else {
                this.$router.push({
                    path: '/'
                })
            }
        }
    },
    async asyncData({route, redirect, error}) {
        let res = await fetch(`${process.env.backendURL}/auth/info/?token=${route.query.token}`)
        let data = await res.json()
        if(data.error) {
            error(`error: ${data.error}`)
            //redirect('/')
        } else {
            return {name: data.name, token: data.token}
        }
    }
}
</script>

<style scoped>
.confirm-pfp{
    border-radius: 5px;
}
.deny-button{
    background-color: grey;
}
</style>