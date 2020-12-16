<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>Covid-19 Tracker App</q-toolbar-title>
            </q-toolbar>

            <q-tabs align="right">
                <q-route-tab to="/" label="Home Page" />

                <q-btn @click="adminLogout" label="Admin Logout" />
                <q-route-tab to="/admin/signin" label="Admin Signin" />
                <q-route-tab to="/admin/countries" label="Admin Countries" />

                <q-btn @click="userLogout" label="User Logout" />
                <q-route-tab to="/auth/signup" label="Signup" />
                <q-route-tab to="/auth/signin" label="Signin" />
                <q-route-tab to="/user/countries" label="UserCountries" />
            </q-tabs>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import axios from "axios";

export default {
    name: "MainLayout",

    data() {
        return {};
    },
    methods: {
        async adminLogout() {
            try {
                axios.get("/admin/logout");
            } catch (err) {}

            if (this.$route.path !== "/") {
                this.$router.replace("/");
            }
        },
        async userLogout() {
            try {
                axios.get("/auth/logout");
            } catch (err) {}

            if (this.$route.path !== "/") {
                this.$router.replace("/");
            }
        },
    },
};
</script>