import Vue from "vue";

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

export function fetchData({ commit }, payload) {
  const baseURL = "https://api.covid19api.com";
  const from = payload.from;
  const to = payload.to;
  const country = payload.country;

  Vue.prototype.$axios
    .get(`${baseURL}/country/${country}?from=${from}&to=${to}`)
    .then(res => {
      commit("setFetchedData", calcDiff(res.data, 30));
    });
}
