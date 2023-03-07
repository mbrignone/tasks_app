<template>
  <div class="grid grid-cols-1 gap-y-5">
    <div class="place-self-center w-4/5 md:w-1/2 lg:w-1/3">
      <new-task :pushTask="pushTask"></new-task>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mx-3">
      <task-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :deleteTask="deleteTask"
        :updateTask="updateTask"
      ></task-item>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { backendGet, backendDelete, backendPut } from "@/utils/backend_api";

import TaskItem from "@/components/TaskItem.vue";
import NewTask from "@/components/NewTask.vue";

const tasks = reactive([]);
async function getTasks() {
  let response = null;
  try {
    response = await backendGet("/api/todos");
  } catch (error) {
    return;
  }

  if (response.data) {
    response.data.forEach((task) => {
      if (!tasks.includes(task)) {
        tasks.push(task);
      }
    });
  }
}

function pushTask(task) {
  tasks.push(task);
}

async function deleteTask(task) {
  try {
    // remove task from the DB
    await backendDelete(`/api/todos/${task.id}`);
  } catch (error) {
    console.log("Failed to delete task");
    return;
  }

  // remove task from tasks array
  const index = tasks.indexOf(task);
  if (index > -1) {
    tasks.splice(index, 1);
  }
}

async function updateTask(task, newTask) {
  let response = null;
  try {
    // update task in the DB
    response = await backendPut(`/api/todos/${task.id}`, newTask);
  } catch (error) {
    console.log("Failed to update task");
    return false;
  }

  // update task in tasks array
  const index = tasks.indexOf(task);
  console.log(index);
  if (index !== -1) {
    tasks[index] = response.data;
  }

  return true;
}

getTasks();
</script>
