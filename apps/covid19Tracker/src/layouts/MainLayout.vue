<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>Covid-19 Tracker App</q-toolbar-title>
      </q-toolbar>

      <q-tabs align="right">
        <q-route-tab :to="{ name: 'homePage' }" label="Home Page" />
        <q-btn
          @click="adminLogout({ path: $route.path, router: $router })"
          label="Admin Logout"
        />
        <q-route-tab :to="{ name: 'adminLogin' }" label="Admin Login" />
        <q-route-tab :to="{ name: 'adminCountries' }" label="Admin Countries" />

        <q-btn
          @click="userLogout({ path: $route.path, router: $router })"
          label="User Logout"
        />
        <q-route-tab :to="{ name: 'userSignup' }" label="Signup" />
        <q-route-tab :to="{ name: 'userLogin' }" label="Login" />
        <q-route-tab :to="{ name: 'userCountries' }" label="UserCountries" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MainLayout",

  methods: {
    ...mapActions("adminCountries", ["adminLogout"]),
    ...mapActions("userCountries", ["userLogout"]),
  },
};
</script>