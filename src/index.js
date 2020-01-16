'use strict';

import Vue from 'vue';
import App from './components/App.vue';
import router from './router';

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');