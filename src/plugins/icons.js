import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCalendarDays,
  faXmark,
  faCheck,
  faEllipsisV,
  faCaretDown,
  faCaretUp
} from "@fortawesome/free-solid-svg-icons";
library.add(faCalendarDays);
library.add(faXmark);
library.add(faCheck);
library.add(faEllipsisV);
library.add(faCaretDown);
library.add(faCaretUp);

export default {
  install(app) {
    app.component("font-awesome-icon", FontAwesomeIcon);
  }
};
