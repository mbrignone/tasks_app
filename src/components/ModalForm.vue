<template>
  <div
    id="register-modal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
  >
    <div class="relative w-full h-full max-w-md">
      <!-- Tabs for Login and Register forms -->
      <div
        class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 bg-white rounded-lg shadow"
      >
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2" v-for="f in forms" :key="f.value" @click="formSelected = f.value">
            <a href="#" class="inline-block p-4" :class="getTabStyle(f.value)">
              {{ f.title }}
            </a>
          </li>
        </ul>
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-hide="register-modal"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" class="w-5 h-5" />
        </button>

        <login-form v-if="formSelected === 'login'"></login-form>
        <register-form v-if="formSelected === 'register'"></register-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import RegisterForm from "@/components//RegisterForm.vue";
import LoginForm from "@/components//LoginForm.vue";

const formSelected = ref("login");
const forms = [
  { title: "Login", value: "login" },
  { title: "Register", value: "register" }
];
function getTabStyle(value) {
  return {
    "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active ": value === formSelected.value,
    "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300":
      value !== formSelected.value
  };
}
</script>
