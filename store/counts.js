export const state = () => ({
    users: []
})

let findUser = (state, name) => {
    return state.users.find(user => user.name.toLowerCase() == name.toLowerCase())
}

export const actions = {
    async loadUser({ state, commit }, { name }) {
        let found = findUser(state, name)
        if (found && !found.loading) {
            // its ready, just send it
            return found.count
        }

        if (found && found.loading) {
            // its loading, return the promise
            return found.promise
        }

        // this is the first time
        console.log('first time', found)

        let promise = new Promise((resolve, reject) => {
            fetch("https://scratchdb.lefty.one/v3/forum/user/info/" + name)
            .then((res) => res.json())
            .then(data => {
                resolve(data.counts.total.count)
                commit('setUser', { name, count: data.counts.total.count, promise, loading: false })
            })
          });          


        commit('initUser', { name, promise, loading: true })

        return promise
    }
}

export const mutations = {
    setUser(state, { name, count, promise, loading }) {
        let found = findUser(state, name)
        if (found) {
            found = { name, count, promise, loading }
        } else {
            state.users.push({ name, count, promise, loading })
        }
    },
    initUser(state, { name, promise } ) {
        let found = findUser(state, name)
        if (!found) {
            state.users.push({ name, count: 0, promise, loading: true })
        }
    }
}