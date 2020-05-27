import Vue from "vue";
import { date } from "quasar";

import { calcDiff, formatDate } from "src/utils/dateUtils";

export async function fetchData({ commit, getters }, payload) {
  const { getDateDiff } = date;

  commit("setFrom", null);
  commit("setTo", null);
  commit("setFetchedData", null);

  let from = payload.from;
  commit("setFrom", from);

  let to = payload.to;
  commit("setTo", to);

  let dayDiff = getDateDiff(to, from, "days");

  const country = getters.country;

  from = formatDate(from);
  to = formatDate(to);

  try {
    const res = await Vue.prototype.$axiosFetch.get(
      `/country/${country}?from=${from}&to=${to}`
    );
    console.log(res.data);
    commit("setFetchedData", calcDiff(res.data, dayDiff));
    commit("setErrorMsg", null);
  } catch (err) {
    commit("setErrorMsg", err);
  }
}

export function setCountryAction({ commit }, payload) {
  commit("setCountry", payload);
}

export function setFromAction({ commit }, payload) {
  commit("setFrom", payload);
}
export function setToAction({ commit }, payload) {
  commit("setTo", payload);
}
