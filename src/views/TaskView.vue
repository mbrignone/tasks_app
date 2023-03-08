<template>
  <div class="grid grid-cols-1 gap-y-5">
    <div class="place-self-center w-4/5 md:w-1/2 lg:w-1/3">
      <new-task></new-task>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mx-3">
      <task-item v-for="task in pending_tasks" :key="task.id" :task="task"></task-item>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mx-3">
      <task-item
        v-for="task in done_tasks"
        :key="task.id"
        :task="task"
        class="opacity-50"
      ></task-item>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import useTaskStore from "@/stores/taskStore";
import TaskItem from "@/components/TaskItem.vue";
import NewTask from "@/components/NewTask.vue";

const taskStore = useTaskStore();

taskStore.getTasks();

const { tasks } = storeToRefs(taskStore);
const pending_tasks = computed(() => {
  return tasks.value.filter((t) => !t.done);
});
const done_tasks = computed(() => {
  return tasks.value.filter((t) => t.done);
});
</script>
