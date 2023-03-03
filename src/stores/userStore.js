import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: useLocalStorage("userLoggedIn", false)
  }),

  actions: {
    authenticate(email, password) {
      console.log(email, password);
      this.userLoggedIn = true;
    },

    signOut() {
      this.userLoggedIn = null;
    }
  },

  getters: {
    menuItems: (state) => {
      if (!state.userLoggedIn) {
        return [{ title: "Home" }, { title: "About" }];
      } else {
        return [{ title: "Tasks" }, { title: "About" }];
      }
    }
  }
});
