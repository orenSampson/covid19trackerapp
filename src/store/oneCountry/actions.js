import moment from "moment";

const formatDate = date => date + "T00:00:00Z";

const daysAgoFromNow = () =>
  moment()
    .subtract(this.lastDays + 1, "days")
    .format("YYYY-MM-DD");

export function calcDiff({ commit }, payload) {
  const oldArr = payload.arr;
  const lastDays = payload.lastDays;
  const newArr = [];

  for (let i = arr.length - 1, counter = 1; counter <= lastDays && i > 0; i--) {
    newArr.unshift({
      date: arr[i].Date,
      newCases: arr[i].Confirmed - arr[i - 1].Confirmed,
      newDeaths: arr[i].Deaths - arr[i - 1].Deaths
    });

    counter++;
  }
}
// calcDiff(arr) {
//     for (
//         let i = arr.length - 1, counter = 1;
//         counter <= this.lastDays && i > 0;
//         i--
//     ) {
//         this.fetchedData.unshift({
//             date: arr[i].Date,
//             newCases: arr[i].Confirmed - arr[i - 1].Confirmed,
//             newDeaths: arr[i].Deaths - arr[i - 1].Deaths
//         });

//         counter++;
//     }
// },
