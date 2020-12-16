const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/HomePage.vue")
      },
      {
        path: "user/countries",
        component: () => import("pages/UserCountries.vue")
      },
      {
        path: "graph/:country",
        name: "country",
        component: () => import("pages/Graph.vue")
      },
      { path: "test", component: () => import("pages/test.vue") },
      { path: "auth/signup", component: () => import("pages/UserSignup.vue") },
      { path: "auth/signin", component: () => import("pages/UserSignin.vue") },
      {
        path: "admin/signin",
        component: () => import("pages/AdminSignin.vue")
      },
      {
        path: "admin/countries",
        component: () => import("pages/AdminCountries.vue")
      }
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
