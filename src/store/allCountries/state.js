import {
  FETCH_INTERVAL_OPTIONS,
  FETCH_INTERVAL_OPTIONS_DEFAULT
} from "src/constants/generalInfo";

export default function() {
  return {
    countriesArr: [],
    intervalId: null,
    fetchIntervalVal: FETCH_INTERVAL_OPTIONS[FETCH_INTERVAL_OPTIONS_DEFAULT]
  };
}
