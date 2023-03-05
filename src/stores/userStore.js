import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export default defineStore("user", {
  state: () => ({
    userInfo: useLocalStorage("userInfo", {})
  }),

  actions: {
    authenticate(email, password) {
      console.log(email, password);
      this.userInfo = {};
    },

    signOut() {
      this.userInfo = null;
    }
  },

  getters: {
    menuItems: (state) => {
      if (!state.userInfo) {
        return [{ title: "Home" }, { title: "About" }];
      } else {
        return [{ title: "Tasks" }, { title: "About" }];
      }
    }
  }
});
