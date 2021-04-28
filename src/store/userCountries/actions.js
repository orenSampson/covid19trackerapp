import { userData } from "src/constants/stateData";
import responses from "src/constants/responses";
import { notifyError } from "src/utils/errorHandling";

const generalError = responses.generalError;

export async function fetchData({ commit, dispatch }) {
  dispatch("resetErrorMsg");
  dispatch("resetCountriesArr");

  let res;
  try {
    res = await this.$axios.get("/api/user/getcountries");
  } catch (error) {
    console.log(
      "🚀 ~ file: actions.js ~ line 31 ~ fetchData ~ error",
      error.message
    );
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
    return commit("setErrorMsg", generalError);
  }

  const countriesArr = res.data.data;

  commit("setCountriesArr", countriesArr);
}

export function setFetchIntervalVal({ commit }, payload) {
  commit("setFetchIntervalVal", payload);
}

export function intervalFetchData({ dispatch, commit, getters }) {
  const fetchIntervalVal = getters.fetchIntervalVal;

  const intervalId = setInterval(
    () => dispatch("fetchData"),
    fetchIntervalVal * 1000
  );

  commit("setIntervalId", intervalId);
}

export function stopCurrentInterval({ getters, dispatch }) {
  const intervalId = getters.intervalId;
  if (intervalId) {
    clearInterval(intervalId);
    dispatch("resetIntervalId");
  }
}

export async function changeSelected({ getters, commit }, payload) {
  const countryId = payload;
  const country = getters.country(countryId);

  try {
    await this.$axios.post("/api/user/updateselected", {
      countryId: country.countryId,
      isSelectedNewVal: !country.isSelected
    });
  } catch (error) {
    notifyError(error);
    return false;
  }

  commit("changeSelected", countryId);
  return true;
}

export function resetState({ dispatch }) {
  dispatch("stopCurrentInterval");

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

export async function userLogout({}, { path, router }) {
  try {
    await this.$axios.get("/api/auth/user/logout");
  } catch (error) {
    return notifyError(error);
  }

  if (path !== "/") {
    router.replace("/");
  }
}
