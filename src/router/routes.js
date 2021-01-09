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
        path: "country/:country",
        name: "country",
        component: () => import("pages/country.vue")
      },
      { path: "test", component: () => import("pages/test.vue") },
      { path: "auth/signup", component: () => import("pages/UserSignup.vue") },
      { path: "auth/login", component: () => import("pages/UserLogin.vue") },
      {
        path: "admin/login",
        component: () => import("pages/AdminLogin.vue")
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
