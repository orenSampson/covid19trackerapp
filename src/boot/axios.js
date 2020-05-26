import Vue from "vue";
import axios from "axios";

const axiosForFetch = axios.create({
  baseURL: "https://api.covid19api.com"
});

Vue.prototype.$axiosFetch = axiosForFetch;
