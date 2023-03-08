import { defineStore } from "pinia";

import { backendGet, backendPost, backendDelete, backendPut } from "@/utils/backend_api";

export default defineStore("tasks", {
  state: () => ({
    tasks: []
  }),

  actions: {
    async getTasks() {
      let response = null;
      try {
        response = await backendGet("/api/todos");
      } catch (error) {
        return;
      }

      if (response.data) {
        response.data.forEach((task) => {
          if (!this.tasks.some((t) => t.id === task.id)) {
            this.tasks.push(task);
          }
        });
      }
    },
    async createTask(values) {
      let response = null;
      try {
        response = await backendPost("/api/todos", values);
      } catch (error) {
        console.log("Failed to create task");
        return false;
      }

      this.tasks.push(response.data);
      return true;
    },
    async deleteTask(task) {
      try {
        // remove task from the DB
        await backendDelete(`/api/todos/${task.id}`);
      } catch (error) {
        console.log("Failed to delete task");
        return false;
      }

      // remove task from task array
      const index = this.tasks.indexOf(task);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }

      return true;
    },
    async updateTask(task, newTask) {
      let response = null;
      try {
        // update task in the DB
        response = await backendPut(`/api/todos/${task.id}`, newTask);
      } catch (error) {
        console.log("Failed to update task");
        return false;
      }

      // update task in the view
      for (const key in task) {
        task[key] = response.data[key];
      }

      return true;
    },
    async resolveTask(task) {
      let response = null;
      try {
        // update task in the DB
        response = await backendPut(`/api/todos/${task.id}/resolve`);
      } catch (error) {
        console.log("Failed to update task");
        return false;
      }

      // update task in the view
      for (const key in task) {
        task[key] = response.data[key];
      }

      return true;
    }
  }
});
