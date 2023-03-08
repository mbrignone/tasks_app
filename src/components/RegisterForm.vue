<template>
  <!-- Modal content -->
  <div class="relative bg-white rounded-lg shadow">
    <div class="px-6 py-6 lg:px-8">
      <h3 class="mb-4 text-xl font-medium text-gray-900">Sign in to our platform</h3>
      <alert-form :alertInfo="alertInfo" :closeAlert="closeAlert"></alert-form>
      <google-button :message="'Sign in with Google'" :sep="true"></google-button>
      <vee-form class="space-y-6" :validation-schema="schema" @submit="registerUser">
        <!-- Name -->
        <div>
          <label class="block mb-2 text-sm font-bold text-gray-900"> Name </label>
          <vee-field
            name="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your Name"
          />
          <error-message class="text-red-600" name="name"></error-message>
        </div>
        <!-- Mail -->
        <div>
          <label class="block mb-2 text-sm font-bold text-gray-900"> Email </label>
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
          <label class="block mb-2 text-sm font-bold text-gray-900">Password</label>
          <vee-field
            type="password"
            name="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <error-message class="text-red-600" name="password"></error-message>
        </div>
        <!-- Confirm Password -->
        <div>
          <label class="block mb-2 text-sm font-bold text-gray-900">Confirm Password</label>
          <vee-field
            type="password"
            name="confirm_password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <error-message class="text-red-600" name="confirm_password"></error-message>
        </div>
        <!-- TOS -->
        <div class="flex flex-wrap items-start mb-6">
          <div class="flex items-center h-5">
            <vee-field
              type="checkbox"
              name="tos"
              value="1"
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
            />
          </div>
          <label class="ml-2 text-sm font-medium text-gray-900">
            I agree with the
            <a href="#" class="text-blue-600 hover:underline"> terms and conditions </a>
          </label>
          <error-message class="text-red-600 mt-1" name="tos"></error-message>
        </div>
        <!-- Submit -->
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Create account
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { backendPost } from "@/utils/backend_api";

import AlertForm from "@/components/AlertForm.vue";
import GoogleButton from "@/components/GoogleButton.vue";

const schema = {
  name: "required|min:3|max:100",
  email: "required|min:3|max:100|email",
  password: "required|min:8|max:100",
  confirm_password: "password_match:@password",
  tos: "tos_required"
};

const alertInfo = reactive({
  show: false,
  message: "",
  color: "text-green-600",
  icon: "fa-solid fa-check",
  iconBg: "bg-green-100"
});
async function registerUser(values, { resetForm }) {
  const userData = {
    email: values.email,
    password: values.password,
    full_name: values.name
  };

  try {
    await backendPost("/api/register", userData);
  } catch (error) {
    alertInfo.message = "Error registering user";
    alertInfo.color = "text-red-600";
    alertInfo.iconBg = "bg-red-100";
    alertInfo.icon = "fa-solid fa-xmark";
    alertInfo.show = true;
    return;
  }

  alertInfo.message = "User registered!";
  alertInfo.color = "text-green-600";
  alertInfo.iconBg = "bg-green-100";
  alertInfo.icon = "fa-solid fa-check";
  alertInfo.show = true;
  resetForm();
}

function closeAlert() {
  alertInfo.show = false;
}
</script>
