<template>
  <nav-bar></nav-bar>
  <div class="min-h-screen bg-gray-100 pt-28 pb-5">
    <home-view v-if="!userLoggedIn"></home-view>
    <task-view v-else></task-view>
  </div>
</template>

<script setup>
import { ref } from "vue";

import NavBar from "@/components/NavBar.vue";
import HomeView from "@/views/HomeView.vue";
import TaskView from "@/views/TaskView.vue";

import useUserStore from "@/stores/userStore";

const userStore = useUserStore();
const userLoggedIn = ref(userStore.userLoggedIn);
</script>
