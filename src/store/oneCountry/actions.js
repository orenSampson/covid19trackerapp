import Vue from "vue";
import moment from "moment";

const calcDiff = (arr, daysAmount) => {
  if (arr.length > 2) {
    const compactedArr = [];
    compactedArr.push(arr[0]);
    for (let i = 1; i < arr.length - 1; i++) {
      if (compactedArr[compactedArr.length - 1].Date === arr[i].Date) {
        compactedArr[compactedArr.length - 1].Confirmed += arr[i].Confirmed;
        compactedArr[compactedArr.length - 1].Deaths += arr[i].Deaths;
      } else {
        compactedArr.push(arr[i]);
      }
    }

    console.log(compactedArr);

    const newArr = [];
    for (
      let i = compactedArr.length - 1, counter = 1;
      counter <= daysAmount && i > 0;
      i--
    ) {
      newArr.unshift({
        date: compactedArr[i].Date,
        newCases: compactedArr[i].Confirmed - compactedArr[i - 1].Confirmed,
        newDeaths: compactedArr[i].Deaths - compactedArr[i - 1].Deaths
      });

      counter++;
    }

    return newArr;
  }
  commit("setErrorMsg", "Array fetched is to short. please try again");
};

const formatDate = date => date + "T00:00:00Z";

export async function fetchData({ commit, getters }, payload) {
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

  const country = getters.country;
  from = formatDate(from);
  to = formatDate(to);

  try {
    const res = await Vue.prototype.$axios.get(
      `${baseURL}/country/${country}?from=${from}&to=${to}`
    );
    console.log(res.data);
    commit("setFetchedData", calcDiff(res.data, dayDiff));
    commit("setErrorMsg", null);
  } catch (err) {
    commit("setErrorMsg", err);
  }
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
