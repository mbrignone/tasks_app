<template>
  <GoogleLogin :callback="callback" popup-type="TOKEN">
    <button
      class="text-gray-900 focus:outline-none bg-gray-50 font-bold rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
    >
      <svg
        class="w-4 h-4 mr-2 -ml-1"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      {{ message }}
    </button>
  </GoogleLogin>
  <div v-show="sep" class="flex justify-between items-center mb-1">
    <hr class="w-full" />
    <span class="p-2 text-gray-400">OR</span>
    <hr class="w-full" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["message", "sep", "clickCallback"]);
const message = ref(props.message);
const sep = ref(props.sep);
// eslint-disable-next-line vue/no-setup-props-destructure
const clickCallback = props.clickCallback;

const callback = (response) => {
  clickCallback(response.access_token);
};
</script>
