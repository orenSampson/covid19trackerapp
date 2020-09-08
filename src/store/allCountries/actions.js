import axios from "axios";

import { Notify } from "quasar";

export async function fetchData({ commit, dispatch }) {
  try {
    const res = await axios.get("/user/getcountries", {
      headers: {
        userid: localStorage.getItem("userId"),
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    });

    const countriesArr = res.data.data;

    commit("setCountriesArr", countriesArr);
  } catch (err) {
    commit("setCountriesArr", []);

    console.log("Err: ", err);
    //response.data.message

    return Notify.create({
      message: "Error, Please try again later",
      color: "primary"
    });
  }
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
  const countriesArr = getters.countriesArr;

  const i = countriesArr.findIndex(item => {
    return item.countryId === countryId;
  });

  if (i < 0) {
    Notify.create({
      message: "Error, Please try again later",
      color: "primary"
    });

    return false;
  }

  try {
    await axios.post(
      "/user/updateselected",
      {
        userId: localStorage.getItem("userId"),
        countryId,
        isSelectedNewVal: !countriesArr[i].isSelected
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

  commit("changeSelected", i);

  return true;
}
