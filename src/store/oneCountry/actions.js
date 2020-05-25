import Vue from "vue";
import moment from "moment";

const calcDiff = (arr, daysAmount) => {
  const newArr = [];

  for (
    let i = arr.length - 1, counter = 1;
    counter <= daysAmount && i > 0;
    i--
  ) {
    newArr.unshift({
      date: arr[i].Date,
      newCases: arr[i].Confirmed - arr[i - 1].Confirmed,
      newDeaths: arr[i].Deaths - arr[i - 1].Deaths
    });

    counter++;
  }

  return newArr;
};

const formatDate = date => date + "T00:00:00Z";

export function fetchData({ commit, state }, payload) {
  commit("setFrom", null);
  commit("setTo", null);
  commit("setFetchedData", null);

  const baseURL = "https://api.covid19api.com";

  let from = payload.from;
  from = moment(from, "YYYY-MM-DD").format("YYYY-MM-DD");
  commit("setFrom", from);

  let to = payload.to;
  to = moment(to, "YYYY-MM-DD").format("YYYY-MM-DD");
  commit("setTo", to);

  const fromMoment = moment(from, "YYYY-MM-DD");
  const toMoment = moment(to, "YYYY-MM-DD");
  const dayDiff = toMoment.diff(fromMoment, "days");

  const country = state.country;
  from = formatDate(from);
  to = formatDate(to);

  Vue.prototype.$axios
    .get(`${baseURL}/country/${country}?from=${from}&to=${to}`)
    .then(res => {
      console.log(res.data);
      commit("setFetchedData", calcDiff(res.data, dayDiff));
    });
}

export function setCountryAction({ commit }, payload) {
  commit("setCountry", payload);
}

export function setFromAction({ commit }, payload) {
  commit("setFrom", payload);
}
export function setToAction({ commit }, payload) {
  commit("setTo", payload);
}
