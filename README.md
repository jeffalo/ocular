# 🔍 ocular
ocular is the search tool for the scratch forums.

it's up at [ocular.jeffalo.net](https://ocular.jeffalo.net)

## behind the scenes
- data from [DatOneLefty's ScratchDB](https://scratchdb.lefty.one/)
- styling taken from [Maximouse](https://scratch.mit.edu/users/Maximouse)'s userstyle
- big inspiration from [forums.scratchstats.com](https://forums.scratchstats.com)
- nuxt because SSR
- hosted at home
- and obviously scratch!

## how to run

you will need your own my-ocular server if you don't want to use production data, otherwise you can use the production my-ocular server by setting the `BACKEND_URL` env variable to `https://my-ocular.jeffalo.net`. keep in mind you will get cors errors unless you run the nuxt server on `localhost` port `8000` or `8001`. you can change the nuxt server port via the `PORT` env variable.

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
