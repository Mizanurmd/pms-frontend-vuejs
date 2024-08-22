import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Optional: Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
