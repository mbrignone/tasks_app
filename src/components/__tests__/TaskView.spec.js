import { it, expect, describe, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

import useTaskStore from "@/stores/taskStore";

import TaskView from "@/views/TaskView.vue";
import TaskItem from "@/components/TaskItem.vue";

describe("TaskView.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Render list of tasks (all pending)", () => {
    const taskStore = useTaskStore();
    const tasks = [{}, {}, {}];
    taskStore.tasks = tasks;

    const component = shallowMount(TaskView);

    const taskItems = component.findAllComponents(TaskItem);
    expect(taskItems).toHaveLength(tasks.length);
    expect(component.vm.pending_tasks).toHaveLength(tasks.length);
    expect(component.vm.done_tasks).toHaveLength(0);

    taskItems.forEach((wrapper, index) => {
      expect(wrapper.props().task).toStrictEqual(tasks[index]);
    });
  });

  it("Render list of tasks (all done)", () => {
    const taskStore = useTaskStore();
    const tasks = [{ done: true }, { done: true }, { done: true }];
    taskStore.tasks = tasks;

    const component = shallowMount(TaskView);

    const taskItems = component.findAllComponents(TaskItem);
    expect(taskItems).toHaveLength(tasks.length);
    expect(component.vm.pending_tasks).toHaveLength(0);
    expect(component.vm.done_tasks).toHaveLength(tasks.length);

    taskItems.forEach((wrapper, index) => {
      expect(wrapper.props().task).toStrictEqual(tasks[index]);
    });
  });

  it("Render list of tasks (pending and done)", () => {
    const taskStore = useTaskStore();
    const tasks = [{ done: false }, { done: false }, { done: true }];
    taskStore.tasks = tasks;

    const component = shallowMount(TaskView);

    const taskItems = component.findAllComponents(TaskItem);
    expect(taskItems).toHaveLength(tasks.length);
    expect(component.vm.pending_tasks).toHaveLength(2);
    expect(component.vm.done_tasks).toHaveLength(1);

    taskItems.forEach((wrapper, index) => {
      expect(wrapper.props().task).toStrictEqual(tasks[index]);
    });
  });
});
