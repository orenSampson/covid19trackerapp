import { date } from "quasar";
import axios from "axios";

import { BASE_URL } from "src/constants/covid19api";
import {
  DATA_MODE_OPTIONS,
  FROM_DEFAULT,
  TO_DEFAULT,
  COUNTRY_SLUG_DEFAULT,
  DATA_MODE_DEFAULT,
  FETCHED_DATA_DEFAULT
} from "src/constants/userCountry";
import {
  mergeSubCountries,
  calcDiff,
  formatDateWithTime
} from "src/utils/date";
import { notifyError } from "src/utils/errorHandling";

export function setDates({ commit, getters, dispatch }, payload) {
  const { formatDate } = date;
  commit(
    "setFrom",
    payload.from
      ? formatDateWithTime(formatDate(payload.from, "YYYY-MM-DD"))
      : FROM_DEFAULT
  );
  commit(
    "setTo",
    payload.to
      ? formatDateWithTime(formatDate(payload.to, "YYYY-MM-DD"))
      : TO_DEFAULT
  );

  commit("setCountrySlug", payload.countrySlug);

  if (getters.from && getters.to && getters.countrySlug) {
    return dispatch("fetchData");
  }
}

export async function fetchData({ commit, getters }) {
  const { subtractFromDate, formatDate } = date;
  let fromOneDaySubtract = formatDate(
    subtractFromDate(getters.from, {
      days: 1
    }),
    "YYYY-MM-DD"
  );
  fromOneDaySubtract = formatDateWithTime(fromOneDaySubtract);

  try {
    let res = await axios.get(
      `${BASE_URL}/country/${getters.countrySlug}?from=${fromOneDaySubtract}&to=${getters.to}`
    );

    let fetchedDataArr;
    switch (getters.dataMode) {
      case DATA_MODE_OPTIONS[0]:
        fetchedDataArr = calcDiff(res.data);
        break;
      case DATA_MODE_OPTIONS[1]:
        fetchedDataArr = mergeSubCountries(res.data);
        fetchedDataArr.shift();
        break;
    }

    commit("setFetchedData", fetchedDataArr);
  } catch (error) {
    commit("setFrom", FROM_DEFAULT);
    commit("setTo", TO_DEFAULT);
    commit("setCountrySlug", COUNTRY_SLUG_DEFAULT);
    commit("setDataMode", DATA_MODE_DEFAULT);
    commit("setFetchedData", FETCHED_DATA_DEFAULT);
    notifyError(error);
  }
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
