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

export function fetchData({ commit }, payload) {
  const baseURL = "https://api.covid19api.com";

  let from = payload.from;
  commit("setFrom", from);

  let to = payload.to;
  commit("setTo", to);

  const country = payload.country;
  commit("setCountry", country);

  const fromMoment = moment(from, "YYYY-MM-DD");
  const toMoment = moment(to, "YYYY-MM-DD");
  const dayDiff = toMoment.diff(fromMoment, "days");

  from = formatDate(from);
  to = formatDate(to);

  Vue.prototype.$axios
    .get(`${baseURL}/country/${country}?from=${from}&to=${to}`)
    .then(res => {
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
