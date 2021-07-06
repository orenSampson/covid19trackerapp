export function setFrom(state, payload) {
  state.from = payload;
}

export function setTo(state, payload) {
  state.to = payload;
}

export function setLastDays(state, payload) {
  state.lastDays = payload;
}

// export function setCountrySlug(state, payload) {
//   state.countrySlug = payload;
// }

export function setDataMode(state, payload) {
  state.dataMode = payload;
}

export function setFetchedData(state, payload) {
  state.fetchedData = payload;
}
