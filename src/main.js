import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex";
import VueApexCharts from 'vue3-apexcharts';
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "sweetalert2/dist/sweetalert2.min.css";

import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import "bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import '/static/css/AdminLTE.min.css';
import '/static/css/skin-blue.min.css';
import '/static/js/plugins/pace/pace.min.css';

import '/static/js/plugins/jQuery/jQuery-2.2.0.min.js';
import '/static/js/plugins/AdminLTE/app.min.js';
import '/static/js/plugins/pace/pace.min.js';
    
import './assets/styles.css';
import './assets/main.css';
import './assets/responsive.css';
import './assets/admin.js';
import './assets/bootstrap.bundle.min.js';

import '../static/js/plugins/datatables/dataTables.bootstrap.css';
import '../static/css/bootstrap.min.css';
import '../static/unpkg.com_xlsx@0.18.5_dist_xlsx.full.min.js';

import 'datatables.net'
import 'datatables.net-bs'

import router from "./router";

const app = createApp(App)

app.use(router)
   .use(store)
   .use(VueApexCharts)
   .mount('#app')

app.config.globalProperties.$swal = Swal;

var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var alertTrigger = document.getElementById('liveAlertBtn')

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}

if (alertTrigger) {
  alertTrigger.addEventListener('click', function () {
    alert('Nice, you triggered this alert message!', 'success')
  })
}
