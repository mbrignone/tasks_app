<template>
  <div
    v-if="alertInfo.show"
    class="flex items-center w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
  >
    <div
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-green-100"
      :class="alertInfo.iconBg"
    >
      <font-awesome-icon :icon="alertInfo.icon" class="w-5 h-5" :class="alertInfo.color" />
    </div>
    <div class="ml-3 text-base font-bold" :class="alertInfo.color">
      {{ alertInfo.message }}
    </div>
    <button
      @click="closeAlert"
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps(["alertInfo", "closeAlert"]);

const alertInfo = reactive(props.alertInfo);
// eslint-disable-next-line vue/no-setup-props-destructure
const closeAlert = props.closeAlert;
</script>
