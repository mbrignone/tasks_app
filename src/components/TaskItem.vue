<template>
  <div class="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
    <div class="flex justify-between mb-3">
      <h5 class="text-2xl font-bold tracking-tight text-gray-900">
        {{ task.title }}
      </h5>
      <div class="relative">
        <button @click="showDropdown = !showDropdown" class="px-2" type="button">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="scale-150" />
        </button>
        <!-- Dropdown menu -->
        <div
          v-if="showDropdown"
          ref="taskDropdown"
          class="absolute -right-9 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-auto h-auto"
        >
          <ul class="py-2 text-sm text-gray-700">
            <li
              v-for="option in cardOptions"
              :key="option.value"
              @click="selectCardOption(option.value)"
            >
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                {{ option.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="mb-3 font-normal text-gray-700">
      {{ task.description }}
    </p>
    <button
      v-if="!task.done"
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
      @click="selectCardOption('done')"
    >
      Mark as DONE
      <font-awesome-icon icon="fa-solid fa-check" class="ml-2" />
    </button>

    <edit-task-form v-if="showEdit" :task="task" :updateShowEdit="updateShowEdit"></edit-task-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { onClickOutside } from "@vueuse/core";

import useTaskStore from "@/stores/taskStore";
import EditTaskForm from "@/components/EditTaskForm.vue";

const props = defineProps(["task"]);
const task = reactive(props.task);
const taskStore = useTaskStore();

const showDropdown = ref(false);

const cardOptions = [
  { name: "Edit", value: "edit" },
  { name: "Remove", value: "remove" }
];

const showEdit = ref(false);
function updateShowEdit(value) {
  showEdit.value = value;
}

function selectCardOption(option) {
  showDropdown.value = false;
  if (option === "remove") {
    taskStore.deleteTask(task);
  } else if (option === "edit") {
    updateShowEdit(true);
  } else if (option === "done") {
    taskStore.resolveTask(task);
  }
}

const taskDropdown = ref(null);
onClickOutside(taskDropdown, () => {
  showDropdown.value = false;
});
</script>
