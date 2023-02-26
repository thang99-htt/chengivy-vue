import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex";
import VueSweetalert2 from 'vue-sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import './assets/main.css';
import './assets/style.css';
import './assets/styles.css';
import './assets/responsive.css';
import './assets/admin.js';


import router from "./router";
// createApp(App).mount('#app')

// createApp(App).use(router).mount("#app");

// Vue.config.productionTip = false;
createApp(App).use(router).use(store).use(VueSweetalert2).mount('#app');


