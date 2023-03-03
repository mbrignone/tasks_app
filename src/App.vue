<template>
  <nav-bar></nav-bar>
  <div class="min-h-screen bg-gray-100 pt-28 pb-5">
    <!-- <home-view></home-view> -->
    <task-view></task-view>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
// import HomeView from "@/views/HomeView.vue";
import TaskView from "@/views/TaskView.vue";
</script>
