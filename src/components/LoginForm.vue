<template>
  <!-- Modal content -->
  <div class="relative bg-white rounded-lg shadow">
    <div class="px-6 py-6 lg:px-8">
      <h3 class="mb-4 text-xl font-medium text-gray-900">Log in to our platform</h3>
      <alert-form :alertInfo="alertInfo" :closeAlert="closeAlert"></alert-form>
      <google-button
        :message="'Log in with Google'"
        :sep="true"
        :clickCallback="loginUserGoogle"
      ></google-button>
      <vee-form class="space-y-6" :validation-schema="schema" @submit="loginUser">
        <!-- Mail -->
        <div>
          <label for="email" class="block mb-2 text-sm font-bold text-gray-900">Email</label>
          <vee-field
            type="email"
            name="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
          />
          <error-message class="text-red-600" name="email"></error-message>
        </div>
        <!-- Password -->
        <div>
          <label for="password" class="block mb-2 text-sm font-bold text-gray-900">Password</label>
          <vee-field
            type="password"
            name="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <error-message class="text-red-600" name="password"></error-message>
        </div>
        <!-- Lost password -->
        <div class="flex justify-end">
          <a href="#" class="text-sm text-blue-700 hover:underline">Lost Password?</a>
        </div>
        <!-- Submit -->
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login to your account
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { backendPost } from "@/utils/backend_api";

import useUserStore from "@/stores/userStore";
import AlertForm from "@/components/AlertForm.vue";
import GoogleButton from "@/components/GoogleButton.vue";

const schema = {
  email: "required|min:3|max:100|email",
  password: "required|min:8|max:100"
};

const alertInfo = reactive({
  show: false,
  message: "",
  color: "text-green-600",
  icon: "fa-solid fa-check",
  iconBg: "bg-green-100"
});

function setAlertError(show = true, message = "Error during login") {
  alertInfo.color = "text-red-600";
  alertInfo.iconBg = "bg-red-100";
  alertInfo.icon = "fa-solid fa-xmark";
  alertInfo.message = message;
  alertInfo.show = show;
}

function setAlertSuccess(show = true) {
  alertInfo.message = "Successful login!";
  alertInfo.color = "text-green-600";
  alertInfo.iconBg = "bg-green-100";
  alertInfo.icon = "fa-solid fa-check";
  alertInfo.show = show;
}

const userStore = useUserStore();
async function loginUser(values) {
  const resp = await userStore.authenticate(values.email, values.password);
  if (resp === "success") {
    window.location.reload();
  } else {
    if (resp === "invalid") {
      setAlertError(true, "Invalid email or password");
    } else {
      setAlertError();
    }
  }
}

async function loginUserGoogle(token) {
  if (!token) {
    setAlertError();
    return;
  }

  const resp = await userStore.authenticate(null, null, token);
  if (resp === "success") {
    setAlertSuccess();
    window.location.reload();
  } else {
    if (resp === "invalid") {
      setAlertError(true, "Invalid email or password");
    } else {
      setAlertError();
    }
  }
}

function closeAlert() {
  alertInfo.show = false;
}
</script>
