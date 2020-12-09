import axios from "axios";
import { Notify } from "quasar";

import { notifyError } from "src/utils/errorHandling";

export async function fetchData({ commit }) {
  let res;

  try {
    res = await axios.get("/user/getcountries", {
      headers: {
        withCredentials: true
      }
    });
  } catch (err) {
    commit("setCountriesArr", []);

    if (err && err.response && err.response.data && err.response.data.message) {
      return commit("setErrorMsg", err.response.data.message);
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
  } catch (err) {
    notifyError(err);
    return false;
  }

  commit("changeSelected", countryId);
  return true;
}
