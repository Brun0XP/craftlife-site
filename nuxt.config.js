export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  server: {
    port: 8080,
  },

  publicRuntimeConfig: {
    mercadopagoPublicKey: process.env.MERCADOPAGO_PUBLIC_KEY,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'craftlife-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap',
      },
    ],
    script: [
      { src: 'https://sdk.mercadopago.com/js/v2' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '@mdi/font/css/materialdesignicons.min.css' },
    { src: '~/assets/css/global.css' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vee-validate.js",
    '~/plugins/v-mask.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/onesignal',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  oneSignal: {
    cdn: true,
    init: {
      appId: '08d51612-2972-460d-824b-8f82e447ee05',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
          disable: true
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BACKEND_URL || 'http://localhost:3000',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate"]
  },

  auth: {
    redirect: {
      login: '/auth/login',
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          user: { url: '/user', method: 'get' },
          logout: false,
        }
      }
    }
  },

}
