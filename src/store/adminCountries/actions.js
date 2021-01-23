import axios from "axios";

import { adminInitValues } from "src/constants/stateData";
import { notifyError } from "src/utils/errorHandling";

export async function fetchData({ commit }) {
  let adminCountriesArr;

  try {
    adminCountriesArr = await axios.get("/admin/getcountries", {
      withCredentials: true
    });
  } catch (error) {
    commit("setAdminCountriesArr", []);
    return notifyError(error);
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
  } catch (error) {
    return notifyError(error);
  }

  commit("changeSelected", countryIndex);
}

export function setAdminCountriesArr({ commit }, payload) {
  commit("setAdminCountriesArr", payload);
}

export function resetState({ commit }) {
  commit("setAdminCountriesArr", adminInitValues.adminCountriesArr);
}

export async function adminLogout({}, { path, router }) {
  try {
    await axios.get("/auth/admin/logout");
  } catch (error) {
    return notifyError(error);
  }

  if (path !== "/") {
    router.replace("/");
  }
}
