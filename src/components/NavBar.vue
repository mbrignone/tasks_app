<template>
  <nav class="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <a href="#" class="flex items-center">
        <font-awesome-icon icon="fa-solid fa-calendar-days" class="h-6 mr-3 sm:h-9" />
        <span class="self-center text-xl font-semibold whitespace-nowrap">Task APP </span>
      </a>
      <div class="flex md:order-2">
        <button
          v-if="!userLoggedIn"
          @click="updateShowModal(true)"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
        >
          Login / Register
        </button>
        <nav-bar-avatar v-else></nav-bar-avatar>
        <button
          type="button"
          @click="showMenu = !showMenu"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <font-awesome-icon icon="fa-solid fa-bars" class="w-6 h-6" />
        </button>
      </div>
      <div class="items-center justify-between w-full md:flex md:w-auto md:order-1">
        <ul
          class="flex-col p-2 mt-2 rounded-lg md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
          :class="showMenu ? 'flex' : 'hidden'"
        >
          <li v-for="(item, index) in menuItems" :key="item.title">
            <router-link
              :to="{ name: item.title.toLowerCase() }"
              class="block py-2 pl-3 pr-4 text-lg font-bold"
              :class="getMenuStyle(index)"
              @click="handleMenuClick(item, index)"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <modal-form v-if="showModal" :updateShowModal="updateShowModal"></modal-form>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import useUserStore from "@/stores/userStore";
import ModalForm from "@/components/ModalForm.vue";
import NavBarAvatar from "@/components/NavBarAvatar.vue";

const userStore = useUserStore();
const { userLoggedIn, menuItems } = storeToRefs(userStore);

const selectedIndex = ref(0);
function getMenuStyle(index) {
  return {
    "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0":
      index === selectedIndex.value,
    "text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white":
      index !== selectedIndex.value
  };
}

const showMenu = ref(false);
function handleMenuClick(item, index) {
  selectedIndex.value = index;
  showMenu.value = false;
}

const showModal = ref(false);
function updateShowModal(value) {
  showModal.value = value;
}
</script>
