import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendarDays, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faCalendarDays);
library.add(faXmark);

export default {
  install(app) {
    app.component("font-awesome-icon", FontAwesomeIcon);
  }
};
