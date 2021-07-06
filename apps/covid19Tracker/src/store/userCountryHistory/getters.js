import { date } from "quasar";

import { calcDiff } from "src/utils/date";
import { DATA_MODE_OPTIONS } from "src/constants/userCountryHistory";

export function from(state) {
  return state.from;
}

export function to(state) {
  return state.to;
}

export function lastDays(state) {
  return state.lastDays;
}

// export function countrySlug(state) {
//   return state.countrySlug;
// }

export function dataMode(state) {
  return state.dataMode;
}

export function fetchedData(state) {
  return state.fetchedData;
}

export function xAxisArr(state, getters) {
  const { formatDate } = date;
  const fetchedData = getters.fetchedData;

  const xAxisArr = [];
  for (let i = 1; i < fetchedData.length; i++) {
    xAxisArr.push(formatDate(fetchedData[i].date, "DD-MM-YYYY"));
  }

  return xAxisArr;
}

export function yAxisCasesArr(state, getters) {
  // console.log("yAxisCasesArr running");
  let yAxisCasesArr = [...getters.fetchedData];
  const dataMode = getters.dataMode;

  // console.log("dataMode :>> ", dataMode);

  if (dataMode === DATA_MODE_OPTIONS[0]) {
    yAxisCasesArr = calcDiff(yAxisCasesArr);
  } else {
    yAxisCasesArr.shift();
  }

  yAxisCasesArr = yAxisCasesArr.map(country => country.cases);

  // console.log("yAxisCasesArr :>> ", yAxisCasesArr);

  return yAxisCasesArr;
}

export function yAxisDeathsArr(state, getters) {
  // console.log("yAxisDeathsArr running");
  let yAxisDeathsArr = [...getters.fetchedData];
  const dataMode = getters.dataMode;

  // console.log("dataMode :>> ", dataMode);

  if (dataMode === DATA_MODE_OPTIONS[0]) {
    yAxisDeathsArr = calcDiff(yAxisDeathsArr);
  } else {
    yAxisDeathsArr.shift();
  }

  yAxisDeathsArr = yAxisDeathsArr.map(country => country.deaths);

  // console.log("yAxisDeathsArr :>> ", yAxisDeathsArr);

  return yAxisDeathsArr;
}

export function legendArr(state, getters) {
  // console.log("legendArr running");
  const legendArr = [`${getters.dataMode} cases`, `${getters.dataMode} deaths`];
  return legendArr;
}
