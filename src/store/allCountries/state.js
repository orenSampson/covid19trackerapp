import consts from "src/constants/GeneralInfo.constants";

export default function() {
  return {
    countriesArr: [],
    errorMsg: null,
    intervalId: null,
    fetchIntervalVal: consts.FETCHINTERVALOPTIONS[2]
  };
}
