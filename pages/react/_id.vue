<template>
    <main class="margined">
        <div v-if="$auth.loggedIn()">
            are you sure you want to react to post {{ $route.params.id }} with "{{ $route.query.emoji }}"?
            <button @click="react($route.params.id, $route.query.emoji)">yes</button>
            <button @click="close()">no</button>
        </div>
        <div v-if="!$auth.loggedIn()">
            please <a href="/login" target="_blank" rel="noopener noreferrer">login to ocular</a> to react to posts. come back when you're done. don't worry.. i'll wait.
        </div>
    </main>
</template>

<script>
export default {
    methods: {
        async react(id, emoji) {
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
    }
}
</script>