<template>
  <div
    v-if="alertInfo.show"
    class="flex items-center w-full p-4 mb-4 text-gray-500 rounded-lg shadow"
    :class="alertInfo.iconBg"
  >
    <div class="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-lg">
      <font-awesome-icon :icon="alertInfo.icon" class="w-5 h-5" :class="alertInfo.color" />
    </div>
    <div class="ml-3 text-base font-bold" :class="alertInfo.color">
      {{ alertInfo.message }}
    </div>
    <button
      @click="closeAlert"
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8"
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
