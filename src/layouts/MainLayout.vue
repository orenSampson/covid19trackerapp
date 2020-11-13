<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>Covid-19 Tracker App</q-toolbar-title>
            </q-toolbar>

            <q-tabs align="right">
                <q-route-tab to="/admin/signin" label="admin signin" />
                <q-route-tab to="/admin/countries" label="admin countries" />
                <q-route-tab to="/auth/signup" label="signup" />
                <q-route-tab to="/auth/signin" label="signin" />
                <q-route-tab to="/" label="userCountries" />
            </q-tabs>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    name: "MainLayout",

    data() {
        return {};
    },
};
</script>