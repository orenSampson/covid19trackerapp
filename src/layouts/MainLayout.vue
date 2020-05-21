<template>
    <q-layout view="lHh Lpr lFf">
        <h3 class="text-center">Covid-19 Tracker App</h3>
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
    }
};
</script>
