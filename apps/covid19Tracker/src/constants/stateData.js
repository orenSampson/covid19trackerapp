import {
  FETCH_INTERVAL_OPTIONS,
  FETCH_INTERVAL_OPTIONS_DEFAULT
} from "src/constants/userCountries";

export const adminInitValues = {
  adminCountriesArr: []
};

export const userData = {
  countriesArr: [],
  intervalId: null,
  fetchIntervalVal: FETCH_INTERVAL_OPTIONS[FETCH_INTERVAL_OPTIONS_DEFAULT],
  errorMsg: null
};
