import Vue from "vue";
import axios from "axios";

const axiosForFetch = axios.create({
  baseURL: "https://api.covid19api.com"
});

const axiosForSignup = axios.create({
  baseURL: "http://localhost:8080/auth/signup"
});

Vue.prototype.$axiosFetch = axiosForFetch;
Vue.prototype.$axiosSignup = axiosForSignup;
