<template>
  <div class="container">
    <Header pageName="login confirmation" pageLink="/confirm-login" />
    <div class="margined">
        <h1>do you want to login as {{name}}</h1>
        <img :src="`https://fluffyscratch.hampton.pw/user/${name}/profile/picture`"
            width="90"
            height="90"
        />
        <p>logging in will allow you to use cool ocular stuff!!!!</p>
        <button @click="confirm">confirm</button>
        <button @click="deny">deny</button>
      <Footer />
    </div>
  </div>
</template>

<script>
import cookies from 'js-cookie'
export default {
    middleware: 'notauthenticated',
    data() {
        return {
            name: '',
            token: '',
            oneTimeToken: this.$route.query.token,
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