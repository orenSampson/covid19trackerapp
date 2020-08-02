<template>
    <div class="q-pa-md" style="max-width: 400px">
        <h5>Sign in</h5>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
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
    name: "Signin",
    data() {
        return {
            email: null,
            password: null,
            submitDisabled: false,
        };
    },
    methods: {
        async onSubmit() {
            this.submitDisabled = true;
            try {
                const response = await Vue.prototype.$axiosSignin.post("/", {
                    email: this.email,
                    password: this.password,
                });
                this.submitDisabled = false;
                localStorage.setItem("token", token);
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