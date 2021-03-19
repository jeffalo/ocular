export default ({store}, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    let auth = {
        loggedIn() {
            return !!store.state.auth.user
        },
        user() {
            return store.state.auth.user
        },
    }
    inject('auth', auth)
}