import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
    menuItems: [{ title: "Home" }, { title: "About" }]
  }),

  actions: {
    authenticate(email, password) {
      console.log(email, password);
      this.userLoggedIn = true;
    },

    signOut() {
      this.userLoggedIn = false;
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
