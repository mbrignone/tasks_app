<template>
  <div class="flex flex-col items-center">
    <button
      type="button"
      @click="closeNewTask"
      class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-auto px-3 py-2 text-center mb-5"
    >
      CREATE NEW TASK
      <font-awesome-icon v-if="!showNewTask" icon="fa-solid fa-caret-down" class="ml-2 scale-125" />
      <font-awesome-icon v-else icon="fa-solid fa-caret-up" class="ml-2 scale-125" />
    </button>

    <alert-form :alertInfo="alertInfo" :closeAlert="closeAlert"></alert-form>
    <vee-form v-if="showNewTask" :validation-schema="schema" @submit="createTask" class="w-full">
      <div class="mb-2">
        <label class="block mb-1 text-lg font-bold text-gray-900">Title</label>
        <vee-field
          name="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Task 1"
        />
        <error-message class="text-red-600" name="title"></error-message>
      </div>
      <div class="mb-2">
        <label class="block mb-1 text-sm font-bold text-gray-900"> Details </label>
        <vee-field
          name="description"
          as="textarea"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-28"
          placeholder="Do this..."
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center"
      >
        CREATE TASK
      </button>
    </vee-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import useTaskStore from "@/stores/taskStore";

import AlertForm from "@/components/AlertForm.vue";

const showNewTask = ref(false);
const taskStore = useTaskStore();

const schema = {
  title: "required"
};

const alertInfo = reactive({
  show: false,
  message: "",
  color: "text-green-600",
  icon: "fa-solid fa-check",
  iconBg: "bg-green-100"
});
async function createTask(values) {
  const success = await taskStore.createTask(values);
  if (!success) {
    alertInfo.show = true;
    alertInfo.message = "Error creating task";
    alertInfo.color = "text-red-600";
    alertInfo.iconBg = "bg-red-100";
    alertInfo.icon = "fa-solid fa-xmark";
    return;
  }

  showNewTask.value = false;

  alertInfo.message = "Task created!";
  alertInfo.color = "text-green-600";
  alertInfo.iconBg = "bg-green-100";
  alertInfo.icon = "fa-solid fa-check";
  alertInfo.show = true;
}

function closeAlert() {
  alertInfo.show = false;
}

function closeNewTask() {
  showNewTask.value = !showNewTask.value;
  closeAlert();
}
</script>
