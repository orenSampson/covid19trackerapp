export function setAdminCountriesArr(state, payload) {
  const adminCountriesArr = payload;

  state.adminCountriesArr = adminCountriesArr;
}

export function changeSelected(state, payload) {
  const i = payload;

  state.adminCountriesArr[i].isSelected = !state.adminCountriesArr[i]
    .isSelected;
}
