import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import VueThemeManager from "vue-theme-manager";
import { createProvider } from "./vue-apollo";

let themeOptions = {
  activate: "light",
  styles: {
    dark: {
      backgroundColor: "#0D1117",
      textColor: "#ededed",
    },
  },
};

Vue.use(VueThemeManager, themeOptions);

new Vue({
  router,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
