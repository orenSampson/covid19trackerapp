import Vue from "vue";
import { date, Notify } from "quasar";

import { calcDiff, formatDateWithTime } from "src/utils/date";

export async function fetchData({ commit, getters }, payload) {
  const { getDateDiff, subtractFromDate, formatDate } = date;

  let from = payload.from;
  commit("setFrom", from);

  let to = payload.to;
  commit("setTo", to);

  const country = getters.country;

  let dayDiff = getDateDiff(to, from, "days") + 1;

  from = formatDate(subtractFromDate(from, { days: 1 }), "YYYY-MM-DD");

  from = formatDateWithTime(from);
  to = formatDateWithTime(to);

  try {
    const res = await Vue.prototype.$axiosFetch.get(
      `/country/${country}?from=${from}&to=${to}`
    );
    commit("setFetchedData", calcDiff(res.data, dayDiff));
  } catch (err) {
    commit("setFetchedData", []);
    
    if (err && err.response && err.response.data && err.response.data.message) {
        return Notify.create({
          message: err.response.data.message,
          color: "primary"
        });
    }
    return Notify.create({
        message: "Error, Please try again later",
        color: "primary"
    });
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
