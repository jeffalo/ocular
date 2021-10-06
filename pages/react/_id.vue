<template>
    <main class="margined">
        <div v-if="$auth.loggedIn()" v-show="!loading">
            are you sure you want to toggle reaction to <a target="_blank" :href="`https://scratch.mit.edu/discuss/post/${$route.params.id}`">{{ text }}</a> with "{{ $route.query.emoji }}"?
            <button autofocus @click="react($route.params.id, $route.query.emoji)">yes</button>
            <button @click="close()">no</button>
        </div>
        <div v-show="loading && !done">
            loading... this could take a second.
        </div>
        <div v-if="!$auth.loggedIn()">
            please <a href="/login" target="_blank" rel="noopener noreferrer">login to ocular</a> to react to posts. come back when you're done. don't worry.. i'll wait.
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            done: false
        }
    },
    methods: {
        async react(id, emoji) {
            this.loading = true
            await this.$store.dispatch("auth/login", this.$auth.token()); // refresh user details
            if(this.$auth.user()){
                let res = await fetch(`${process.env.backendURL}/api/reactions/${id}`, {
                    method: "POST",
                    headers: {
                        Authorization: this.$auth.token(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        emoji: emoji
                    })
                });
                let data = await res.json();
                this.loading = false
                this.done = true
                if (!window.opener && !window.opener !== window) {
                    // user is not in a popup
                    this.$router.push({
                        path: `/post/${this.$route.params.id}`
                    })
                }
                if(data.error) {
                    alert(data.error)
                } else {
                    close()
                }
            }
        },
        close() {
            window.close()
            if(!window.closed){
                alert('please close this window')
            }
        }
    },
    async asyncData({ route }) {
        let postData = await fetch(`https://scratchdb.lefty.one/v3/forum/post/info/${route.params.id}`).then(res=>res.json())
        if(postData.username) {
            return {text: `${postData.username}'s post`}
        } else {
            return {text: `post id ${route.params.id}`}
        }
    }
}
</script>

<style scoped>
main {
    padding: 10px
}
</style>