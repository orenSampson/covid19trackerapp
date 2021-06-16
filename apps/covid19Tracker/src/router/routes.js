const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "homePage",
        component: () => import("pages/HomePage.vue")
      },
      {
        path: "user/signup",
        name: "userSignup",
        component: () => import("pages/user/Signup.vue")
      },
      {
        path: "user/login",
        name: "userLogin",
        component: () => import("pages/user/Login.vue")
      },
      {
        path: "user/countries",
        name: "userCountries",
        component: () => import("pages/user/Countries.vue")
      },
      {
        path: "countryHistory/:countrySlug",
        name: "countryHistory",
        component: () => import("pages/user/CountryHistory.vue")
      },
      {
        path: "admin/login",
        name: "adminLogin",
        component: () => import("pages/admin/Login.vue")
      },
      {
        path: "admin/countries",
        name: "adminCountries",
        component: () => import("pages/admin/Countries.vue")
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
