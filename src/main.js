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
          background: '#f2fbf7',
          surface: '#ffffff',
          primary: '#42b883',
          secondary: '#35495e',
          error: '#dc2626',
          info: '#2f855a',
          success: '#2e7d32',
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
