<template>
  <q-page class="q-pa-md" style="max-width: 400px">
    <h5>Admin Login</h5>
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input v-model="password" outlined type="password" label="Password" />
      <q-btn
        label="Sign In"
        type="submit"
        color="primary"
        :disable="submitDisabled"
      />
    </q-form>
  </q-page>
</template>

<script>
import { notifyError, notifyMessage } from "src/utils/errorHandling";

export default {
  name: "AdminLogin",
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
        const response = await this.$axios.post("/api/auth/admin/login", {
          password: this.password,
        });

        this.submitDisabled = false;

        if (response && response.data && response.data.message) {
          return notifyMessage(response.data.message);
        }
      } catch (error) {
        this.submitDisabled = false;
        notifyError(error);
      }
    },
  },
};
</script>