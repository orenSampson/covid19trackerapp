import axios from "axios";

import { Notify } from "quasar";

export async function fetchData({ commit }) {
  let res;

  try {
    res = await axios.get("/user/getcountries", {
      headers: {
        userid: localStorage.getItem("userId"),
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    });
  } catch (err) {
    commit("setCountriesArr", []);

    return Notify.create({
      message: "Error, Please try again later",
      color: "primary"
    });
    // return Notify.create({
    //   message: err.response.data.message,
    //   color: "primary"
    // });
  }

  if (!res) {
    commit("setCountriesArr", []);

    return Notify.create({
      message: "Error, Please try again later",
      color: "primary"
    });
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
        userId: localStorage.getItem("userId"),
        countryId: country.countryId,
        isSelectedNewVal: !country.isSelected
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken")
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
