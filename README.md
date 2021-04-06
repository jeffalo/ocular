# 🔍 ocular
Ocular is the search tool for the scratch forums.
It's up at [ocular.jeffalo.net](ocular.jeffalo.net), so try it out!

## Behind the scenes
- Data from [DatOneLefty's ScratchDB](https://scratchdb.lefty.one/).
- Styling taken from [Maximouse](https://scratch.mit.edu/users/Maximouse)'s userstyle.
- Big inspiration from [forums.scratchstats.com](https://forums.scratchstats.com).
- Nuxt because SSR.
- Hosted at home.
- And obviously scratch!

## How to run

You will need your own my-ocular server if you don't want to use production data, otherwise you can use the production my-ocular server by setting the `BACKEND_URL` env variable to `https://my-ocular.jeffalo.net`. Keep in mind you will get cors errors unless you run the nuxt server on `localhost` port `8000` or `8001`. you can change the nuxt server port via the `PORT` env variable!

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
