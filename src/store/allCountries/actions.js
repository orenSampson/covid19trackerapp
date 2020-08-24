import Vue from "vue";
import axios from "axios";

import { Notify } from "quasar";

export async function fetchData({ commit }) {
  try {
    const res = await axios.get("/user/getcountries", {
      headers: {
        userid: localStorage.getItem("userId"),
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    });

    const countriesArr = res.data.data;

    countriesArr.sort((countryA, countryB) => {
      if (countryA.TotalConfirmed < countryB.TotalConfirmed) return 1;
      if (countryA.TotalConfirmed > countryB.TotalConfirmed) return -1;
      return 0;
    });

    commit("setCountriesArr", countriesArr);
  } catch (err) {
    commit("setCountriesArr", []);

    // return Notify.create({
    //     message: err.response.data.message,
    //     color: "primary",
    // });

    return Notify.create({
      message: "Unable To Fetch Data: " + err,
      color: "primary"
    });
  }
}

export function intervalFetchData({ dispatch, commit, getters }) {
  const fetchInterval = getters.fetchIntervalVal;

  const intervalId = setInterval(
    () => dispatch("fetchData"),
    fetchInterval * 1000
  );

  commit("setIntervalId", intervalId);
}

export function stopCurrentInterval({ getters }) {
  const intervalId = getters.intervalId;

  clearInterval(intervalId);
}

export function setFetchIntervalValAction({ commit }, payload) {
  commit("setFetchIntervalVal", payload);
}
