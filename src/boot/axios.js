import Vue from "vue";
import axios from "axios";

// axios.defaults.headers.post["Content-Type"] = "application/json";

// const mainAxios = axios.create({
//   baseURL: "https://some-domain.com/api/"
// });

// const customAxios = axios.create({
//   baseURL: "https://some-custom-domain.com/api/"
// });

// Vue.prototype.$axiosAuth = mainAxios;

// Vue.prototype.$axiosFetch = customAxios;

Vue.prototype.$axios = axios;
