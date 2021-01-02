import axios from "axios";

import { userData } from "src/constants/stateData";

import {
  FETCH_INTERVAL_OPTIONS,
  FETCH_INTERVAL_OPTIONS_DEFAULT
} from "src/constants/userCountries";
import { notifyError } from "src/utils/errorHandling";

export async function fetchData({ commit }) {
  let res;

  try {
    res = await axios.get("/user/getcountries", {
      headers: {
        withCredentials: true
      }
    });
  } catch (error) {
    commit("setCountriesArr", []);

    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      return commit("setErrorMsg", error.response.data.message);
    }
    return commit("setErrorMsg", "Error, Please try again later");
  }

  if (!res) {
    commit("setCountriesArr", []);
    return commit("setErrorMsg", "Error, Please try again later");
  }

  const countriesArr = res.data.data;

  commit("setCountriesArr", countriesArr);
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

export async function changeSelected({ getters, commit }, payload) {
  const countryId = payload;
  const country = getters.country(countryId);

  try {
    await axios.post(
      "/user/updateselected",
      {
        countryId: country.countryId,
        isSelectedNewVal: !country.isSelected
      },
      {
        headers: {
          withCredentials: true
        }
      }
    );
  } catch (error) {
    notifyError(error);
    return false;
  }

  commit("changeSelected", countryId);
  return true;
}

export function resetState({ commit }) {
  commit("setCountriesArr", userData.countriesArr);
  commit("setIntervalId", userData.intervalId);
  commit("setFetchIntervalVal", userData.fetchIntervalVal);
  commit("setErrorMsg", userData.errorMsg);
}

export async function userLogout({ dispatch }, { path, router }) {
  try {
    await axios.get("/auth/user/logout");
  } catch (error) {
    return notifyError(error);
  }

  dispatch("resetState");

  if (path !== "/") {
    router.replace("/");
  }
}
