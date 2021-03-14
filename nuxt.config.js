export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'ocular',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'the all in one forum tool for scratch' }
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
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/color-mode'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'vue-plausible'
  ],
  plausible: {
    domain: 'ocular.jeffalo.net',
    apiHost: 'https://analytics.jeffalo.net'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
