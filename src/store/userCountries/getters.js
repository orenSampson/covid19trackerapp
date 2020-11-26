export function countriesArr(state, commit) {
  //   let countriesArrCopy = [...state.countriesArr];

  //   sortByIsSelected(countriesArrCopy);

  //   commit("setCountriesArr", countriesArrCopy);

  //   return countriesArrCopy;
  return state.countriesArr;
}

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
