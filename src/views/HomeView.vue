<template>
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
      @click="updateShowModal"
      href="#"
      class="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
    >
      Get Started
    </a>
    <modal-form v-if="showModal" :updateShowModal="updateShowModal"></modal-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ModalForm from "@/components/ModalForm.vue";

const showModal = ref(false);
function updateShowModal(value) {
  showModal.value = value;
}
</script>
