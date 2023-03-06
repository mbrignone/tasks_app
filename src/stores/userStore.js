import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import { backendGet, backendPost } from "@/utils/backend_api";

export default defineStore("user", {
  state: () => ({
    userInfo: useLocalStorage("userInfo", {})
  }),

  actions: {
    async authenticate(email, password) {
      const loginData = { username: email, password };
      let response;
      try {
        response = await backendPost("/api/token", loginData, false, true);
      } catch (error) {
        if (error.response.status === 400) {
          return "Invalid email or password";
        } else {
          return "Error, please try again late";
        }
      }

      const userInfo = {
        token: response.data.access_token
      };
      this.userInfo = useLocalStorage("userInfo", userInfo, { mergeDefaults: true });

      let userData;
      try {
        userData = await backendGet("/api/users/me");
      } catch (error) {
        console.log(error);
      }

      if (userData && userData.data.full_name) {
        userInfo["name"] = userData.data.full_name;
      } else {
        userInfo["name"] = email;
      }

      this.userInfo = useLocalStorage("userInfo", userInfo, { mergeDefaults: true });

      return "Successful login";
    },

    signOut() {
      this.userInfo = null;
    }
  },

  getters: {
    menuItems: (state) => {
      if (!state.userLoggedIn) {
        return [{ title: "Home" }, { title: "About" }];
      } else {
        return [{ title: "Tasks" }, { title: "About" }];
      }
    },
    userLoggedIn: (state) => {
      return state.userInfo && Object.keys(state.userInfo).length > 0;
    }
  }
});
