import axios from "axios";
import useUserStore from "@/stores/userStore";

const base_url = import.meta.env.VITE_BASE_URL;

function getAuthHeader(userStore) {
  return `Bearer ${userStore.userInfo.token}`;
}

async function backendGet(endpoint, auth = true) {
  let response;
  try {
    if (!auth) {
      response = await axios.get(`${base_url}${endpoint}`);
    } else {
      const userStore = useUserStore();
      response = await axios.get(`${base_url}${endpoint}`, {
        headers: {
          Authorization: getAuthHeader(userStore)
        }
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  return response;
}

async function backendPost(endpoint, data, auth = true, form = false) {
  let response;
  try {
    if (!auth && !form) {
      response = await axios.post(`${base_url}${endpoint}`, data);
    } else {
      const headers = {};
      if (auth) {
        const userStore = useUserStore();
        headers["Authorization"] = getAuthHeader(userStore);
      }
      if (form) {
        headers["Content-Type"] = "multipart/form-data";
      }
      response = await axios.post(`${base_url}${endpoint}`, data, {
        headers: headers
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  return response;
}

export { backendGet, backendPost };
