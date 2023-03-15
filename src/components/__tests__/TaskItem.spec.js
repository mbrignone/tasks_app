import { it, expect, describe, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

import TaskItem from "@/components/TaskItem.vue";
import EditTaskForm from "@/components/EditTaskForm.vue";

describe("TaskItem.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Render single task", () => {
    const task = {
      title: "Task Title",
      description: "Task Description",
      done: false
    };

    const component = shallowMount(TaskItem, {
      props: { task }
    });

    expect(component.text()).toContain("Task Title");
    expect(component.text()).toContain("Task Description");
    expect(component.text()).toContain("Mark as DONE");

    expect(component.vm.showDropdown).toBe(false);
    expect(component.vm.showEdit).toBe(false);

    const editForm = component.findAllComponents(EditTaskForm);
    expect(editForm).toHaveLength(0);
  });
});
