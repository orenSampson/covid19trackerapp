import Vue from "vue";

import { Notify } from "quasar";

export async function fetchData({ commit }) {
  try {
    const res = await Vue.prototype.$axiosFetch.get("/summary");
    const countriesArr = res.data.Countries;

    countriesArr.sort((countryA, countryB) => {
      if (countryA.TotalConfirmed < countryB.TotalConfirmed) return 1;
      if (countryA.TotalConfirmed > countryB.TotalConfirmed) return -1;
      return 0;
    });

    commit("setCountriesArr", countriesArr);
  } catch (err) {
    commit("setCountriesArr", []);
    Notify.create({
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
