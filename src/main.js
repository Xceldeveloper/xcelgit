import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import VueThemeManager from 'vue-theme-manager'

let themeOptions = {
activate:'light',
styles:{
     light:{
           backgroundColor:'#ededed',
           textColor:'#101010'
            },
     dark:{
           backgroundColor:'#0D1117',
           textColor:'#ededed'
            }
      }
}

Vue.use(VueThemeManager,themeOptions);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
