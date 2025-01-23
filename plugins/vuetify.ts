import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    defaults: {
      VBtn: {
        color: "primary",
        variant: "elevated",
        rounded: true,
      },
    },
    // ... your configuration
  });
  app.vueApp.use(vuetify);
});
