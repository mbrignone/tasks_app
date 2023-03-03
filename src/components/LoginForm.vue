<template>
  <!-- Modal content -->
  <div class="relative bg-white rounded-lg shadow">
    <div class="px-6 py-6 lg:px-8">
      <h3 class="mb-4 text-xl font-medium text-gray-900">Login to our platform</h3>
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
import { useRouter } from "vue-router";

import useUserStore from "@/stores/userStore";

const schema = {
  email: "required|min:3|max:100|email",
  password: "required|min:8|max:100"
};

const userStore = useUserStore();

const router = useRouter();
function loginUser(values) {
  userStore.authenticate(values.email, values.password);
  router.push({ name: "tasks" });
}
</script>
