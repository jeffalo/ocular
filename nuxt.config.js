export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `ocular | ${titleChunk}` : 'ocular';
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'scratch forum search and more!' }
    ],
    script: [
      {
        src: '/lib/scratchblocks.js'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.svg' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/auth.js', { src: '~/plugins/vue-good-table', ssr: false }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/color-mode'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'vue-plausible',
    '@nuxtjs/redirect-module'
  ],
  plausible: {
    domain: 'ocular.jeffalo.net',
    apiHost: 'https://analytics.jeffalo.net'
  },

  redirect: [
    { from: '^/discuss/(.*)$', to: '/$1' },
    { from: '^/users/(.*)$', to: '/user/$1' },
    { from: '^/@(.*)$', to: '/user/$1' },
    { from: '^/u/(.*)$', to: '/user/$1' },
    { from: '^/t/(.*)$', to: '/topic/$1' },
    { from: '^/p/(.*)$', to: '/post/$1' },
  ],

  env: {
    backendURL: process.env.BACKEND_URL || 'http://localhost:8081'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  loading: {
    color: 'white',
    height: '2px'
  }
}
