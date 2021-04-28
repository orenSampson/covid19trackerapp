import Vue from "vue";
import axios from "axios";
import { Cookies } from "quasar";

Vue.mixin({
  beforeCreate() {
    const options = this.$options;
    if (options.axios) {
      this.$axios = options.axios;
    } else if (options.parent) {
      this.$axios = options.parent.$axios;
    }
  }
});

export default function({ app, store, ssrContext }) {
  console.log("boot axios func called");

  let instance = axios.create({
    baseURL: process.env.SERVER ? "http://localhost:8080" : "/"
  });

  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;

  instance.interceptors.request.use(
    config => {
      if (cookies.get("user_access_token")) {
        config.headers.user_access_token = `bearer ${cookies.get(
          "user_access_token"
        )}`;
      }

      if (cookies.get("admin_access_token")) {
        config.headers.admin_access_token = `bearer ${cookies.get(
          "admin_access_token"
        )}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  app.axios = instance;
  store.$axios = instance;
}
