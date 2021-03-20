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
            return found.data
        }

        if (found && found.loading) {
            // its loading, return the promise
            return found.promise
        }

        // this is the first time

        let promise = new Promise((resolve, reject) => {
            fetch(`${process.env.backendURL}/api/user/` + name)
            .then((res) => res.json())
            .then(data => {
                resolve(data)
                commit('setUser', { name, data, promise, loading: false })
            })
          });          


        commit('initUser', { name, promise, loading: true })

        return promise
    }
}

export const mutations = {
    setUser(state, { name, data, promise, loading }) {
        let found = findUser(state, name)
        if (found) {
            found = { name, data, promise, loading }
        } else {
            state.users.push({ name, data, promise, loading })
        }
    },
    removeUser(state, { name }) {
        state.users = state.users.filter(user => {
            return user.name !== name;
        })
    },
    initUser(state, { name, promise } ) {
        let found = findUser(state, name)
        if (!found) {
            state.users.push({ name, data: {}, promise, loading: true })
        }
    }
}