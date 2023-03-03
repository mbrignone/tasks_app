<template>
  <nav class="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <a href="#" class="flex items-center">
        <font-awesome-icon icon="fa-solid fa-calendar-days" class="h-6 mr-3 sm:h-9" />
        <span class="self-center text-xl font-semibold whitespace-nowrap">Task APP </span>
      </a>
      <div class="flex md:order-2">
        <!-- <button
          type="button"
          data-modal-target="register-modal"
          data-modal-toggle="register-modal"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
        >
          Login / Register
        </button> -->
        <nav-bar-avatar></nav-bar-avatar>
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span class="sr-only">Open main menu</span>
          <font-awesome-icon icon="fa-solid fa-bars" class="w-6 h-6" />
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white"
        >
          <li v-for="(item, index) in menuItems" :key="item.title">
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-lg font-bold"
              :class="getMenuStyle(index)"
              @click="handleMenuClick(item, index)"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <modal-form></modal-form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { initModals } from "flowbite";

import ModalForm from "@/components/ModalForm.vue";
import NavBarAvatar from "@/components/NavBarAvatar.vue";

const menuItems = [{ title: "Home" }, { title: "About" }];
const selectedIndex = ref(0);
function getMenuStyle(index) {
  return {
    "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0":
      index === selectedIndex.value,
    "text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white":
      index !== selectedIndex.value
  };
}

function handleMenuClick(item, index) {
  selectedIndex.value = index;
  console.log(item.title);
}

// initialize components based on data attribute selectors
onMounted(() => {
  initModals();
});
</script>
