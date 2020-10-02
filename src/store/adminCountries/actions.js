import axios from "axios";

import { Notify } from "quasar";

export async function fetchData({ commit }) {
  let adminCountriesArr;

  try {
    adminCountriesArr = await axios.get("/admin/getcountries");
  } catch (err) {
    commit("setAdminCountriesArr", []);

    return Notify.create({
      message: err.response.data.message,
      color: "primary"
    });
  }

  if (!adminCountriesArr) {
    return Notify.create({
      message: "Error, Please try again later",
      color: "primary"
    });
  }

  commit("setAdminCountriesArr", adminCountriesArr.data.data);
}

export async function changeSelected({ getters, commit }, payload) {
  const countryIndex = payload;
  const adminCountry = getters.adminCountriesArr[countryIndex];

  try {
    await axios.post("/admin/updateselected", {
      id: adminCountry._id,
      isSelectedNewVal: !adminCountry.isSelected
    });
  } catch (err) {
    return Notify.create({
      message: err.response.data.message,
      color: "primary"
    });
  }

  commit("changeSelected", countryIndex);
}
