import { createApp, defineAsyncComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router.js";
import store from "./store/index.js";
import App from "./App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const BaseDialog = defineAsyncComponent(() =>
  import("./components/layouts/BaseDialog.vue")
);
const BaseCard = defineAsyncComponent(() =>
  import("./components/layouts/BaseCard.vue")
);
const BaseButton = defineAsyncComponent(() =>
  import("./components/layouts/BaseButton.vue")
);
import BaseSpinner from "./components/layouts/BaseSpinner";

const app = createApp(App);

app.use(router);
app.use(store);

app.use(vuetify);

app.component("base-dialog", BaseDialog);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-spinner", BaseSpinner);
app.mount("#app");
