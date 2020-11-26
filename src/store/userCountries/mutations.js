export function setCountriesArr(state, payload) {
  const countriesArr = payload;
  //   sortByIsSelected(countriesArr);

  state.countriesArr = countriesArr;
}

export function setIntervalId(state, payload) {
  state.intervalId = payload;
}

export function setFetchIntervalVal(state, payload) {
  state.fetchIntervalVal = payload;
}

export function setErrorMsg(state, payload) {
  state.errorMsg = payload;
}

export function changeSelected(state, payload) {
  const i = payload;
  state.countriesArr[i].isSelected = !state.countriesArr[i].isSelected;

  //   sortByIsSelected(state.countriesArr);
}
