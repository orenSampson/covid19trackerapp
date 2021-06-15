export function setCountriesArr(state, payload) {
  state.countriesArr = payload;
}

export function setErrorMsg(state, payload) {
  state.errorMsg = payload;
}

export function changeSelected(state, payload) {
  const { slug, selectedNewVal } = payload;

  const country = findCountry(state, slug);

  country.isSelected = selectedNewVal;
}

const findCountry = (state, slug) => {
  return state.countriesArr.find(country => country.slug === slug);
};
