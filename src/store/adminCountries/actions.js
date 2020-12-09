import axios from "axios";

import { notifyError } from "src/utils/errorHandling";

export async function fetchData({ commit }) {
  let adminCountriesArr;

  try {
    adminCountriesArr = await axios.get("/admin/getcountries", {
      withCredentials: true
    });
  } catch (err) {
    commit("setAdminCountriesArr", []);
    return notifyError(err);
  }

  if (!adminCountriesArr) {
    commit("setAdminCountriesArr", []);
    return notifyError();
  }

  commit("setAdminCountriesArr", adminCountriesArr.data.data);
}

export async function changeSelected({ getters, commit }, payload) {
  const countryIndex = payload;
  const adminCountry = getters.adminCountriesArr[countryIndex];

  try {
    await axios.post(
      "/admin/updateselected",
      {
        id: adminCountry._id,
        isSelectedNewVal: !adminCountry.isSelected
      },
      {
        withCredentials: true
      }
    );
  } catch (err) {
    return notifyError(err);
  }

  commit("changeSelected", countryIndex);
}
