import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/store';
import Vant from 'vant'
import { Lazyload } from 'vant';
import Ajax from './lib/axios';
import moment from 'moment';
import 'vant/lib/index.css';
import './styles/fonts/iconfont.css';
import 'iview/dist/styles/iview.css';
import './styles/app.scss';
import Components from './components';


Vue.config.productionTip = false
Vue.use(Vant);
// options 为可选参数，无则不传
Vue.use(Lazyload, {
    lazyComponent: true
});
Vue.use(Components);
Vue.prototype.$http = Ajax;
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
    mounted() {
        window.setLoaction = function (lng, lat) {
            // window.ikey_time = time || '';
            window.ikey_lng = lng || '';
            window.ikey_lat = lat || '';
            // window.ikey_address = address || '';
            // window.ikey_province = province || '';
            // window.ikey_city = city || '';
        }
    },
  render: h => h(App)
}).$mount('#app')
