<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>Covid-19 Tracker App</q-toolbar-title>
            </q-toolbar>

            <q-tabs align="right">
                <q-route-tab to="/" label="Home Page" />

                <q-btn
                    @click="adminLogout({ path: $route.path, router: $router })"
                    label="Admin Logout"
                />
                <q-route-tab to="/admin/login" label="Admin Login" />
                <q-route-tab to="/admin/countries" label="Admin Countries" />

                <q-btn
                    @click="userLogout({ path: $route.path, router: $router })"
                    label="User Logout"
                />
                <q-route-tab to="/auth/signup" label="Signup" />
                <q-route-tab to="/auth/login" label="Login" />
                <q-route-tab to="/user/countries" label="UserCountries" />
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

    data() {
        return {};
    },
    methods: {
        ...mapActions("adminCountries", ["adminLogout"]),
        ...mapActions("userCountries", ["userLogout"]),
    },
};
</script>