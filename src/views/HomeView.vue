<template>
  <div class="flex flex-col items-center">
    <div>
      <alert-form :alertInfo="alertInfo" :closeAlert="closeAlert"></alert-form>
    </div>
    <div class="flex flex-col items-center">
      <h1
        class="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
      >
        Welcome to the TASKS app!
      </h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
        Login or register to start creating your awesome tasks.
      </p>
      <a
        data-modal-target="register-modal"
        data-modal-toggle="register-modal"
        href="#"
        class="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
      >
        Get Started
      </a>
    </div>
  </div>
</template>

<script setup>
import { reactive, onUpdated, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { initModals } from "flowbite";
import AlertForm from "@/components/AlertForm.vue";

onMounted(() => {
  initModals();
});
onUpdated(() => {
  initModals();
});

const alertInfo = reactive({
  show: false,
  message: "User registered!",
  color: "text-green-600",
  icon: "fa-solid fa-check",
  iconBg: "bg-green-100"
});

const route = useRoute();
const router = useRouter();
if (route.query.user_registered !== undefined) {
  if (route.query.user_registered === "1") {
    alertInfo.message = "User registered!";
    alertInfo.color = "text-green-600";
    alertInfo.iconBg = "bg-green-100";
    alertInfo.icon = "fa-solid fa-check";
  } else {
    alertInfo.message = "Error registering user";
    alertInfo.color = "text-red-600";
    alertInfo.iconBg = "bg-red-100";
    alertInfo.icon = "fa-solid fa-xmark";
  }
  alertInfo.show = true;
}

function closeAlert() {
  alertInfo.show = false;
  router.push({ name: "home" });
}
</script>
