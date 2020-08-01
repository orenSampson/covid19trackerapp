<template>
    <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <q-input v-model="name" filled hint="Name" />
            <q-input v-model="email" filled type="email" hint="Email" />
            <q-input v-model="password" filled type="password" hint="Password" />
            <q-btn label="Sign In" type="submit" color="primary" :disable="submitDisabled" />
        </q-form>
    </div>
</template>

<script>
import Vue from "vue";
import { Notify } from "quasar";

export default {
    name: "Signup",
    data() {
        return {
            name: null,
            email: null,
            password: null,
            submitDisabled: false,
        };
    },
    methods: {
        async onSubmit() {
            this.submitDisabled = true;
            try {
                const response = await Vue.prototype.$axiosSignup.put("/", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                this.submitDisabled = false;
                Notify.create({
                    message: response.data.message,
                    color: "primary",
                });
            } catch (err) {
                this.submitDisabled = false;
                Notify.create({
                    message: err.response.data.message,
                    color: "primary",
                });
            }
        },
    },
};
</script>

<style scoped>
</style>