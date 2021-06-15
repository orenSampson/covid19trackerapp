export function countriesArr(state) {
  let countriesArrCopy = [...state.countriesArr];

  sortByIsSelected(countriesArrCopy);

  return countriesArrCopy;
}

export const country = state => countrySlug => {
  return state.countriesArr.find(country => country.slug === countrySlug);
};

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
