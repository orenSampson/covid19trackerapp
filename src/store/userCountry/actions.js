import Vue from "vue";
import { date } from "quasar";

import { calcDiff, formatDateWithTime } from "src/utils/date";
import { notifyError } from "src/utils/errorHandling";

export async function fetchData({ commit, getters, rootGetters }, payload) {
  const { getDateDiff, subtractFromDate, formatDate } = date;

  commit("setFrom", formatDateWithTime(payload.from));
  let from = subtractFromDate(payload.from, {
    days: 1
  });
  from = formatDate(from, "YYYY-MM-DD");
  from = formatDateWithTime(from);

  const to = formatDateWithTime(payload.to);
  commit("setTo", to);

  const countrySlug = payload.countrySlug;

  const dayDiff = getDateDiff(to, from, "days") + 1;

  try {
    const res = await Vue.prototype.$axiosFetch.get(
      `/country/${countrySlug}?from=${from}&to=${to}`
    );

    commit("setFetchedData", calcDiff(res.data, dayDiff));
  } catch (error) {
    commit("setFrom", null);
    commit("setTo", null);
    commit("setFetchedData", []);
    notifyError(error);
  }
}

export function setFrom({ commit }, payload) {
  commit("setFrom", payload);
}

export function setTo({ commit }, payload) {
  commit("setTo", payload);
}
