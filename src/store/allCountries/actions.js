// import axios from "axios";
import Vue from "vue";
export function fetchData({ commit }) {
  console.log("general Info fetchData fired");

  //   this.$axios
  Vue.prototype.$axios
    .get("https://api.covid19api.com/summary")
    .then(res => {
      const countriesArr = res.data.Countries;
      console.log(countriesArr);

      countriesArr.sort((countryA, countryB) => {
        if (countryA.TotalConfirmed < countryB.TotalConfirmed) return 1;
        if (countryA.TotalConfirmed > countryB.TotalConfirmed) return -1;
        return 0;
      });

      commit("setCountriesArr", countriesArr);
      commit("setErrorMsg", null);
    })
    .catch(err => {
      commit("setCountriesArr", []);
      commit("setErrorMsg", err);
    });
}

export function intervalFetchData({ dispatch, commit }, payload) {
  const fetchInterval = payload;

  const intervalId = setInterval(
    () => dispatch("fetchData"),
    fetchInterval * 1000
  );

  commit("setIntervalId", intervalId);
}

export function stopCurrentInterval({ getters }) {
  const intervalId = getters.getIntervalId;
  clearInterval(intervalId);
}
