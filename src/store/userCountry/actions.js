import Vue from "vue";
import { date } from "quasar";

import { calcDiff, formatDateWithTime } from "src/utils/date";
import { notifyError } from "src/utils/errorHandling";

export async function fetchData({ commit, getters, rootGetters }, payload) {
  const { getDateDiff, subtractFromDate, formatDate } = date;

  let from = payload.from;
  commit("setFrom", from);
  let to = payload.to;
  commit("setTo", to);

  const country = rootGetters["userCountries/country"](getters.countryId);
  const countrySlug = country.slug;

  let dayDiff = getDateDiff(to, from, "days") + 1;

  from = formatDate(subtractFromDate(from, { days: 1 }), "YYYY-MM-DD");
  from = formatDateWithTime(from);
  to = formatDateWithTime(to);
  try {
    const res = await Vue.prototype.$axiosFetch.get(
      `/country/${countrySlug}?from=${from}&to=${to}`
    );
    commit("setFetchedData", calcDiff(res.data, dayDiff));
  } catch (error) {
    commit("setFetchedData", []);
    notifyError(error);
  }
}

export function setCountryId({ commit }, payload) {
  commit("setCountryId", payload);
}

export function setFrom({ commit }, payload) {
  commit("setFrom", payload);
}

export function setTo({ commit }, payload) {
  commit("setTo", payload);
}
