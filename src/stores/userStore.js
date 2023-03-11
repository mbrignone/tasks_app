import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import { backendGet, backendPost } from "@/utils/backend_api";

export default defineStore("user", {
  state: () => ({
    userInfo: useLocalStorage("userInfo", {})
  }),

  actions: {
    async authenticate(email, password, google_token = null) {
      let response;
      let loginData;
      try {
        if (!google_token) {
          loginData = { username: email, password };
          response = await backendPost("/api/token", loginData, false, true);
        } else {
          loginData = { access_token: google_token };
          response = await backendPost("/api/token_google", loginData);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          return "invalid";
        } else {
          return "error";
        }
      }

      const userInfo = {
        token: response.data.access_token
      };
      this.userInfo = useLocalStorage("userInfo", userInfo, { mergeDefaults: true });

      let userData = null;
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

      return "success";
    },

    signOut() {
      this.userInfo = null;
      window.location.reload();
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
