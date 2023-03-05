import { createRouter, createWebHistory } from "vue-router";

import useUserStore from "@/stores/userStore";

const Home = () => import("@/views/HomeView.vue");
const Tasks = () => import("@/views/TaskView.vue");
const About = () => import("@/views/AboutView.vue");

const routes = [
  {
    name: "home",
    path: "/",
    component: Home
  },
  {
    name: "about",
    path: "/about",
    component: About
  },
  {
    name: "tasks",
    path: "/tasks",
    component: Tasks,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    // redirect to home page if trying to access
    // a page that requires being auth without
    // being authenticated
    const userStore = useUserStore();
    if (!userStore.userInfo) {
      return { name: "home" };
    }
  } else if (to.name === "home") {
    // redirect to tasks page if trying to access
    // home page while being authenticated
    const userStore = useUserStore();
    if (userStore.userInfo) {
      return { name: "tasks" };
    }
  }
});

export default router;
