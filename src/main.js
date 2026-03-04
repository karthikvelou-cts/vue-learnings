import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'shopTheme',
    themes: {
      shopTheme: {
        dark: false,
        colors: {
          background: '#f5f7fb',
          surface: '#ffffff',
          primary: '#1e66f5',
          secondary: '#14b8a6',
          error: '#dc2626',
          info: '#0ea5e9',
          success: '#16a34a',
          warning: '#f59e0b',
        },
      },
    },
  },
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
