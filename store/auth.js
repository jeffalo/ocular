import cookies from 'js-cookie'

export const state = () => ({
    user: null,
    token: null
})

export const mutations = {
    set_user(store, data) {
        store.user = data
    },
    set_token(store, data) {
        store.token = data
    },
    reset_user(store) {
        store.user = null
    },
    reset_token(store, data) {
        store.token = null
    }
}

export const actions = {
    async login({ commit, dispatch }, token) { // this is also used as a general purpose "refresh user details" in middlewares and dashboard.vue
        return new Promise((resolve, reject) => {
            fetch(`${process.env.backendURL}/auth/me`, {
                headers: {
                    Authorization: token
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    // console.warn(data.error)
                    dispatch('logout')
                    resolve(data.error) // i could use reject but i'd need to handle it everywhere and i dont feel like doing that
                } else {
                    commit('set_user', data)
                    commit('set_token', token)
                    resolve(data)
                }
            })
        })
    },
    async logout({ commit }) {
        return new Promise(async (resolve, reject) => {
            let token = cookies.get('my-ocular-token')
            cookies.remove('my-ocular-token')
            commit('reset_user')
            commit('reset_token')
            let res = await fetch(`${process.env.backendURL}/auth/remove/?token=${token}`, {
                method: "POST"
            })
            let data = await res.json()
            if(data.error){
                resolve(data.error) // i could use reject but i'd need to handle it everywhere and i dont feel like doing that
            } else {
                resolve('logged out')
            }
        })
    }
}