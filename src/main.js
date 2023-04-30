import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex";
import VueApexCharts from 'vue3-apexcharts'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import './assets/styles.css';
import './assets/main.css';
import './assets/responsive.css';
import './assets/admin.js';

import router from "./router";

const app = createApp(App)

app.use(router)
   .use(store)
   .use(VueApexCharts)
   .mount('#app')
