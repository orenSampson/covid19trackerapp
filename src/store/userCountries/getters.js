export function countriesArr(state) {
  let countriesArrCopy = [...state.countriesArr];

  sortByIsSelected(countriesArrCopy);

  return countriesArrCopy;
}

export const country = state => countryId => {
  return state.countriesArr.find(country => country.countryId === countryId);
};

export function intervalId(state) {
  return state.intervalId;
}

export function fetchIntervalVal(state) {
  return state.fetchIntervalVal;
}

export function errorMsg(state) {
  return state.errorMsg;
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
