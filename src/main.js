/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'


// Components
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'

//Multi-language
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

const i18n = createI18n({
  locale: 'fr',  // langue par défaut
  messages :{
    en : en,
    fr : fr
  },
})


registerPlugins(app)

app.mount('#app')
app.use(router);
app.use(createPinia())
app.use(i18n)
