import Vue from "vue";
import axios from "axios";

const axiosForFetch = axios.create({
  baseURL: "https://api.covid19api.com"
});

const axiosForSignup = axios.create({
  baseURL: "http://localhost:8080/auth/signup"
});

const axiosForSignin = axios.create({
  baseURL: "http://localhost:8080/auth/signin"
});

const axiosForAdminSignin = axios.create({
  baseURL: "http://localhost:8080/admin/signin"
});

Vue.prototype.$axiosFetch = axiosForFetch;
Vue.prototype.$axiosSignup = axiosForSignup;
Vue.prototype.$axiosSignin = axiosForSignin;
Vue.prototype.$axiosAdminSignin = axiosForAdminSignin;
