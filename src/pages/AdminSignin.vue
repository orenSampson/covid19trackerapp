<template>
    <div class="q-pa-md" style="max-width: 400px">
        <h5>Admin Sign in</h5>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
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

import { notifyError, notifyMessage } from "src/utils/errorHandling";

export default {
    name: "AdminSignin",
    data() {
        return {
            password: null,
            submitDisabled: false,
        };
    },
    methods: {
        async onSubmit() {
            this.submitDisabled = true;
            
            try {
                const response = await axios.post("/admin/signin", {
                    password: this.password,
                });

                this.submitDisabled = false;
                
                if (response && response.data && response.data.message){
                    return notifyMessage(response.data.message)
                }
            } catch (err) {
                this.submitDisabled = false;
                notifyError(err);
            }
        },
    },
};
</script>