<template>
    <q-page class="q-pa-md" style="max-width: 400px">
        <h5>Sign up</h5>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <q-input v-model="name" outlined label="Name" />
            <q-input v-model="email" outlined type="email" label="Email" />
            <q-input
                v-model="password"
                outlined
                type="password"
                label="Password"
            />
            <q-btn
                label="Sign Up"
                type="submit"
                color="primary"
                :disable="submitDisabled"
            />
        </q-form>
    </q-page>
</template>

<script>
import Vue from "vue";
import axios from "axios";

import { notifyError, notifyMessage } from "src/utils/errorHandling";

export default {
    name: "UserSignup",

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
                const response = await axios.put("/auth/user/signup", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });

                this.submitDisabled = false;

                if (response && response.data && response.data.message) {
                    notifyMessage(response.data.message);
                }
            } catch (error) {
                this.submitDisabled = false;

                notifyError(error);
            }
        },
    },
    meta: {
        title: "Signup",
    },
};
</script>

<style scoped>
</style>