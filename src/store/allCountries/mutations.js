export function setCountriesArr(state, payload) {
  const countriesArr = payload;
  sortByIsSelected(countriesArr);

  state.countriesArr = countriesArr;
}

export function setIntervalId(state, payload) {
  state.intervalId = payload;
}

export function setFetchIntervalVal(state, payload) {
  state.fetchIntervalVal = payload;
}

export function changeSelected(state, payload) {
  const i = payload;
  state.countriesArr[i].isSelected = !state.countriesArr[i].isSelected;

  sortByIsSelected(state.countriesArr);
}

const sortByIsSelected = function(countriesArr) {
  countriesArr.sort((countryA, countryB) => {
    if (
      (countryA.isSelected && countryB.isSelected) ||
      (!countryA.isSelected && !countryB.isSelected)
    )
      return 0;

    if (countryA.isSelected && !countryB.isSelected) return -1;

    return 1;
  });
};
