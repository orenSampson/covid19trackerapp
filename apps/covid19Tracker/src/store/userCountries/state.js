import { userData } from "src/constants/stateData";

export default function() {
  return {
    countriesArr: userData.countriesArr,
    intervalId: userData.intervalId,
    fetchIntervalVal: userData.fetchIntervalVal,
    errorMsg: userData.errorMsg
  };
}
