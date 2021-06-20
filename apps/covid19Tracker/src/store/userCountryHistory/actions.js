import { date } from "quasar";

import { BASE_URL } from "src/constants/covid19api";
import {
  DATA_MODE_OPTIONS,
  FROM_DEFAULT,
  TO_DEFAULT,
  COUNTRY_SLUG_DEFAULT,
  DATA_MODE_DEFAULT,
  FETCHED_DATA_DEFAULT
} from "src/constants/userCountryHistory";
import { calcDiff } from "src/utils/date";
import { notifyError } from "src/utils/errorHandling";

export function setDates({ commit, getters, dispatch }, payload) {
  const { formatDate } = date;
  commit(
    "setFrom",
    payload.from ? formatDate(payload.from, "YYYY-MM-DD") : FROM_DEFAULT
  );
  commit(
    "setTo",
    payload.to ? formatDate(payload.to, "YYYY-MM-DD") : TO_DEFAULT
  );

  commit("setCountrySlug", payload.countrySlug);

  if (getters.from && getters.to && getters.countrySlug) {
    return dispatch("fetchData");
  }
}

export async function fetchData({ commit, getters }) {
  const { subtractFromDate, formatDate } = date;
  let fromOneDaySubtracted = formatDate(
    subtractFromDate(getters.from, {
      days: 1
    }),
    "YYYY-MM-DD"
  );

  let fetchedCountryHistory;
  try {
    fetchedCountryHistory = await this.$axios.get("api/user/countryhistory", {
      params: {
        from: fromOneDaySubtracted,
        to: getters.to,
        slug: getters.countrySlug
      }
    });
    if (!fetchedCountryHistory) {
      throw new Error();
    }
    fetchedCountryHistory = fetchedCountryHistory.data.data;
  } catch (error) {
    commit("setFrom", FROM_DEFAULT);
    commit("setTo", TO_DEFAULT);
    commit("setCountrySlug", COUNTRY_SLUG_DEFAULT);
    commit("setDataMode", DATA_MODE_DEFAULT);
    commit("setFetchedData", FETCHED_DATA_DEFAULT);
    notifyError(error);
  }

  // switch (getters.dataMode) {
  //   case DATA_MODE_OPTIONS[0]: //new
  //     fetchedCountryHistory = calcDiff(fetchedCountryHistory);
  //     break;
  //   case DATA_MODE_OPTIONS[1]: //total
  //     fetchedCountryHistory.shift();
  //     break;
  // }

  commit("setFetchedData", fetchedCountryHistory);
}

export function setFrom({ commit }, payload) {
  commit("setFrom", payload);
}

export function setTo({ commit }, payload) {
  commit("setTo", payload);
}

export function setDataMode({ getters, commit, dispatch }, payload) {
  commit("setDataMode", payload);

  if (getters.from && getters.to && getters.countrySlug) {
    dispatch("fetchData");
  }
}
