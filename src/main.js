import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "./plugins/validation";
import FontAwesomeIconPlugin from "./plugins/icons";

import "./assets/base.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VeeValidatePlugin);
app.use(FontAwesomeIconPlugin);

app.mount("#app");
