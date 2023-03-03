<template>
  <button
    id="dropdownAvatarNameButton"
    data-dropdown-toggle="dropdownAvatarName"
    class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-800 md:mr-0 focus:ring-4 focus:ring-gray-100"
    type="button"
  >
    <span class="sr-only">Open user menu</span>
    <font-awesome-icon icon="fa-solid fa-user-tie" class="w-6 h-6 rounded-full" />
    <div class="hidden md:inline md:mx-2">Mati Brig</div>
    <font-awesome-icon icon="fa-solid fa-caret-down" />
  </button>

  <!-- Dropdown menu -->
  <div
    id="dropdownAvatarName"
    class="z-10 hidden bg-white divide-y divide-gray-200 rounded-lg shadow w-auto md:w-44"
  >
    <ul class="py-2 text-sm text-gray-700">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
      </li>
    </ul>
    <div class="py-2">
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { initDropdowns } from "flowbite";

// initialize Flowbite dropdown component
onMounted(() => {
  initDropdowns();
});
</script>
