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

export async function changeSelected({ getters, commit }, payload) {
  const { slug, selectedNewVal } = payload;

  try {
    await this.$axios.post("/api/user/updateselected", {
      slug: slug,
      selectedNewVal: selectedNewVal
    });
  } catch (error) {
    notifyError(error);
    return false;
  }

  commit("changeSelected", { slug: slug, selectedNewVal: selectedNewVal });
  return true;
}

export function resetState({ dispatch }) {
  dispatch("resetCountriesArr");
  dispatch("resetErrorMsg");
}

export function resetCountriesArr({ commit }) {
  commit("setCountriesArr", userData.countriesArr);
}

export function resetErrorMsg({ commit }) {
  commit("setErrorMsg", userData.errorMsg);
}

export async function userLogout({}, { path, router }) {
  try {
    await this.$axios.post("/api/user/logout");
  } catch (error) {
    return notifyError(error);
  }

  if (path !== router.resolve({ name: "homePage" }).href) {
    router.replace({ name: "homePage" });
  }
}
