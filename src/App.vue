<template>
  <nav-bar></nav-bar>
  <div class="min-h-screen bg-gray-100 pt-28 pb-5">
    <router-view></router-view>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
</script>
