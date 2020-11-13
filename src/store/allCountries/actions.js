import axios from "axios";

import { Notify } from "quasar";

export async function fetchData({ commit }) {
  let res;

  console.log("fetchData-begining");

  try {
    res = await axios.get("/user/getcountries", {
      headers: {
        withCredentials: true
      }
    });

    console.log("fetchData-successful");
  } catch (err) {
    console.log("fetchData-error1");  

    commit("setCountriesArr", []);

    if (err && err.response && err.response.data && err.response.data.message) {
        return commit("setErrorMsg", err.response.data.message);
    }
    return commit("setErrorMsg", "Error, Please try again later");
  }

  if (!res) {
    console.log("fetchData-error2");  

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
  const countryIndex = payload;
  const country = getters.countriesArr[countryIndex];

  try {
    await axios.post(
      "/user/updateselected",
      {
        // userId: localStorage.getItem("userId"),
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
    Notify.create({
      message: err.response.data.message,
      color: "primary"
    });

    return false;
  }

  commit("changeSelected", countryIndex);

  return true;
}
