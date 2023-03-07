<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-30">
        <div class="w-1/3 max-w-3xl p-6 bg-white rounded-md shadow-xl">
          <vee-form
            :validation-schema="schema"
            :initial-values="taskValues"
            @submit="updateTask"
            class="w-full"
          >
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

            <div class="flex justify-between">
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center"
              >
                UPDATE TASK
              </button>
              <button
                @click="updateShowEdit(false)"
                type="button"
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center"
              >
                CANCEL
              </button>
            </div>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps(["task", "updateShowEdit", "updateTask"]);
const task = reactive(props.task);
// eslint-disable-next-line vue/no-setup-props-destructure
const updateShowEdit = props.updateShowEdit;
// eslint-disable-next-line vue/no-setup-props-destructure
const updateTaskProp = props.updateTask;

const schema = {
  title: "required"
};
const taskValues = {
  title: task.title,
  description: task.description
};

async function updateTask(values) {
  const success = await updateTaskProp(task, values);
  if (success) {
    updateShowEdit(false);
    window.location.reload();
  }
}
</script>
