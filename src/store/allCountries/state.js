import consts from "src/constants/generalInfo";

export default function() {
  return {
    countriesArr: [],
    intervalId: null,
    fetchIntervalVal:
      consts.FETCH_INTERVAL_OPTIONS[consts.FETCH_INTERVAL_OPTIONS_DEFAULT]
  };
}
