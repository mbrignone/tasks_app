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
      this.userInfo = useLocalStorage("userInfo", userInfo);

      let userData;
      try {
        userData = await backendGet("/api/users/me");
      } catch (error) {
        console.log(error);
      }

      if (userData.data.full_name) {
        userInfo["name"] = userData.data.full_name;
      } else {
        userInfo["name"] = email;
      }

      this.userInfo = useLocalStorage("userInfo", userInfo, { mergeDefaults: true });
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
