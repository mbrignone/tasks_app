import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false
  }),

  actions: {
    authenticate(email, password) {
      console.log(email, password);
      this.userLoggedIn = true;
    },

    signOut() {
      this.userLoggedIn = false;
    }
  }
});
