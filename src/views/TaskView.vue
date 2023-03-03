<template>
  <div class="grid grid-cols-1 gap-y-5">
    <div class="place-self-center w-4/5 md:w-1/2 lg:w-1/3">
      <new-task :pushTask="pushTask"></new-task>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mx-3">
      <task-item v-for="task in tasks" :key="task.id" :task="task"></task-item>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

import TaskItem from "@/components/TaskItem.vue";
import NewTask from "@/components/NewTask.vue";

const tasks = reactive([
  { id: 0, title: "Task 1", description: "Do this." },
  { id: 1, title: "Task 2", description: "Also do that." },
  { id: 2, title: "Task 3", description: "Some boring task." },
  { id: 3, title: "Task 4", description: "Some awesome task." }
]);

function pushTask(values) {
  const task = {
    id: tasks.length,
    title: values.title,
    description: values.description
  };
  tasks.push(task);
}
</script>
