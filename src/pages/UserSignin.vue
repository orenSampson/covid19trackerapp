<template>
    <div class="q-pa-md" style="max-width: 400px">
        <h5>Sign in</h5>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <q-input v-model="email" outlined type="email" label="Email" />
            <q-input
                v-model="password"
                outlined
                type="password"
                label="Password"
            />
            <q-btn
                label="Sign In"
                type="submit"
                color="primary"
                :disable="submitDisabled"
            />
        </q-form>
    </div>
</template>

<script>
import axios from "axios";
import { Notify } from "quasar";

export default {
    name: "UserSignin",

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
                const response = await axios.post("/auth/signin", {
                    email: this.email,
                    password: this.password,
                });

                this.submitDisabled = false;

                return Notify.create({
                    message: response.data.message,
                    color: "primary",
                });
            } catch (err) {
                this.submitDisabled = false;

                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                ) {
                    return Notify.create({
                        message: err.response.data.message,
                        color: "primary",
                    });
                }
                return Notify.create({
                    message: "Error, Please try again later",
                    color: "primary",
                });
            }
        },
    },
};
</script>

<style scoped>
</style>