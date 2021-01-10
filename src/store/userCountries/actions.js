import axios from "axios";

import { userData } from "src/constants/stateData";
import responses from "src/constants/responses";
import { notifyError } from "src/utils/errorHandling";

const generalError = responses.generalError;

export async function fetchData({ commit, dispatch }) {
  dispatch("resetErrorMsg");

  let res;

  try {
    res = await axios.get("/user/getcountries", {
      headers: {
        withCredentials: true
      }
    });
  } catch (error) {
    dispatch("resetCountriesArr");

    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      return commit("setErrorMsg", error.response.data.message);
    }
    return commit("setErrorMsg", generalError);
  }

  if (!res) {
    dispatch("resetCountriesArr");
    return commit("setErrorMsg", generalError);
  }

  const countriesArr = res.data.data;

  commit("setCountriesArr", countriesArr);
}

export function setFetchIntervalVal({ commit }, payload) {
  commit("setFetchIntervalVal", payload);
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

export function resetState({ dispatch }) {
  dispatch("resetCountriesArr");
  dispatch("resetIntervalId");
  dispatch("resetFetchIntervalVal");
  dispatch("resetErrorMsg");
}

export function resetCountriesArr({ commit }) {
  commit("setCountriesArr", userData.countriesArr);
}
export function resetIntervalId({ commit }) {
  commit("setIntervalId", userData.intervalId);
}
export function resetFetchIntervalVal({ commit }) {
  commit("setFetchIntervalVal", userData.fetchIntervalVal);
}
export function resetErrorMsg({ commit }) {
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
