const serverCookie = process.server ? require('cookie') : undefined
const clientCookie = process.client ? require('js-cookie') : undefined

// make sure to keep this the same as authetnicated.js

export default async function ({ $auth, redirect, req, store }) {
    let token = null
    if (process.server) {
        if (req.headers.cookie) {
            const parsed = serverCookie.parse(req.headers.cookie)
            token = parsed['my-ocular-token']
        }
    } else {
        token = clientCookie.get('my-ocular-token')
    }

    await store.dispatch('auth/login', token) // reload just incase logged out on another tab or something

    if ($auth.loggedIn()) {
        return redirect('/')
    }
}