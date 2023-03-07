<template>
  <div class="grid grid-cols-1 gap-y-5">
    <div class="place-self-center w-4/5 md:w-1/2 lg:w-1/3">
      <new-task></new-task>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mx-3">
      <task-item v-for="task in tasks" :key="task.id" :task="task"></task-item>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import useTaskStore from "@/stores/taskStore";

import TaskItem from "@/components/TaskItem.vue";
import NewTask from "@/components/NewTask.vue";

const taskStore = useTaskStore();

const tasks = reactive(taskStore.tasks);

taskStore.getTasks();
</script>
