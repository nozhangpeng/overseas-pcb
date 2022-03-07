import Frame from "@views/Home.vue";

export default [
  {
    path: "/app",
    component: Frame,
    children: [
      {
        path: "/app/table",
        meta: {
          title: "App Manage",
        },
        component: (resolve) =>
          require(["@views/pages/nav1/Table.vue"], resolve),
      },
      {
        path: "/app/form",
        meta: {
          title: "App Manage",
        },
        component: (resolve) =>
          require(["@views/pages/nav1/Form.vue"], resolve),
      },
      {
        path: "/app/user",
        meta: {
          title: "App Manage",
        },
        component: (resolve) =>
          require(["@views/pages/nav1/user.vue"], resolve),
      },
    ],
  },
];
