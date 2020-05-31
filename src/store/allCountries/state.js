import consts from "src/constants/GeneralInfo.constants";

export default function() {
  return {
    countriesArr: [],
    errorMsg: null,
    intervalId: null,
    fetchIntervalVal:
      consts.FETCH_INTERVAL_OPTIONS[consts.FETCH_INTERVAL_OPTIONS_DEFAULT]
  };
}
