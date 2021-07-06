import { date } from "quasar";

import { notifyError } from "src/utils/errorHandling";
import { lastDaysToFromTo } from "src/utils/date";
import {
  FROM_DEFAULT,
  TO_DEFAULT,
  LAST_DAYS_DEFAULT,
  // COUNTRY_SLUG_DEFAULT,
  DATA_MODE_DEFAULT,
  FETCHED_DATA_DEFAULT
} from "src/constants/userCountryHistory";

import { LAST_DAYS_OPTIONS } from "src/constants/userCountryHistory";

export function setDates({ commit, getters, dispatch }, payload) {
  console.log("setDates called");

  const { formatDate } = date;
  commit(
    "setFrom",
    payload.from ? formatDate(payload.from, "YYYY-MM-DD") : FROM_DEFAULT
  );
  commit(
    "setTo",
    payload.to ? formatDate(payload.to, "YYYY-MM-DD") : TO_DEFAULT
  );

  if (getters.from && getters.to) {
    dispatch("updateLastDays");

    return dispatch("fetchData", { slug: payload.slug });
  }
}

export async function fetchData({ commit, getters }, payload) {
  console.log("fetchData called");

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
        slug: payload.slug
      }
    });
    if (!fetchedCountryHistory) {
      throw new Error();
    }
    fetchedCountryHistory = fetchedCountryHistory.data.data;
  } catch (error) {
    commit("setFrom", FROM_DEFAULT);
    commit("setTo", TO_DEFAULT);
    commit("setDataMode", DATA_MODE_DEFAULT);
    commit("setFetchedData", FETCHED_DATA_DEFAULT);
    notifyError(error);
  }

  commit("setFetchedData", fetchedCountryHistory);
}

export function updateLastDays({ commit, getters }) {
  console.log("updateLastDays called");

  const { formatDate, isSameDate } = date;

  let from = getters.from;
  let to = getters.to;
  const lastDaysLastVal = getters.lastDays;

  console.log("from :>> ", from);
  console.log("to :>> ", to);

  for (const lastDaysOption of LAST_DAYS_OPTIONS) {
    const { from: lastDaysFrom, to: lastDaysTo } = lastDaysToFromTo(
      lastDaysOption
    );

    const isSameTo = isSameDate(to, lastDaysTo);
    if (!isSameTo) {
      if (lastDaysLastVal !== LAST_DAYS_DEFAULT) {
        commit("setLastDays", LAST_DAYS_DEFAULT);
      }
      return;
    }

    const isSameFrom = isSameDate(from, lastDaysFrom);
    if (isSameFrom) {
      if (lastDaysLastVal !== lastDaysOption) {
        commit("setLastDays", lastDaysOption);
      }

      console.log("lastDaysOption :>> ", lastDaysOption);

      return;
    }
  }

  commit("setLastDays", LAST_DAYS_DEFAULT);
  return;
}

export function setFrom({ commit }, payload) {
  commit("setFrom", payload);
}

export function setTo({ commit }, payload) {
  commit("setTo", payload);
}

export function setDataMode({ getters, commit, dispatch }, payload) {
  commit("setDataMode", payload);
}
