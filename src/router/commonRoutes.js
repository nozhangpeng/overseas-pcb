/*
 * 通用路由配置，需要放在配置项数组的末端
 */
import NotFound from "@views/exception/404.vue";

export default [
  {
    path: "/",
    meta: {
      title: "/",
    },
    redirect: "/app/table", // TODO: default router
  },
  {
    path: "/404",
    component: NotFound,
    name: "",
    hidden: true,
  },
  {
    path: "/login",
    meta: {
      title: "User Login",
      ignoreAuth: true,
    },
    component: (resolve) => require(["@views/pages/login/Login.vue"], resolve),
  },
  {
    path: "*",
    meta: {
      title: "/404",
      ignoreAuth: true,
    },
    component: NotFound,
  },
];
