import Vue from "vue";
import axios from "axios";

import { BASE_URL } from "src/constants/covid19api";

const axiosForFetch = axios.create({
  baseURL: BASE_URL
});

Vue.prototype.$axiosFetch = axiosForFetch;
