const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "graph/:country",
        name: "country",
        component: () => import("pages/Graph.vue")
      },
      { path: "test", component: () => import("pages/test.vue") },
      { path: "auth/signup", component: () => import("pages/Signup.vue") },
      { path: "auth/signin", component: () => import("pages/Signin.vue") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
