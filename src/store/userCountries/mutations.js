export function setCountriesArr(state, payload) {
  state.countriesArr = payload;
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
  const countryId = payload;

  const country = findCountry(state, countryId);

  country.isSelected = !country.isSelected;
}

const findCountry = (state, countryId) => {
  return state.countriesArr.find(country => country.countryId === countryId);
};
