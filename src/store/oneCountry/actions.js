import Vue from "vue";
import { date } from "quasar";

import { calcDiff, formatDateWithTime } from "src/utils/dateUtils";

export async function fetchData({ commit, getters }, payload) {
  const { getDateDiff, subtractFromDate, formatDate } = date;

  commit("setFrom", null);
  commit("setTo", null);
  commit("setFetchedData", null);

  let from = payload.from;
  commit("setFrom", from);

  let to = payload.to;
  commit("setTo", to);

  const country = getters.country;

  let dayDiff = getDateDiff(to, from, "days");

  from = formatDate(subtractFromDate(from, { days: 1 }), "YYYY-MM-DD");

  from = formatDateWithTime(from);
  to = formatDateWithTime(to);

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
