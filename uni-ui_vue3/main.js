import App from './App.vue';
import uviewPlus from '@/uni_modules/uview-plus';

// #ifndef VUE3
import Vue from 'vue';

Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
    ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export function createApp() {
    const app = createSSRApp(App);
    const pinia = createPinia();
    pinia.use(createPersistedState());
    app.use(pinia);
	app.use(uviewPlus);
    return { app };
}
// #endif
