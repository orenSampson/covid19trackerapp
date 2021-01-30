import { date } from "quasar";

export const calcDiff = (arr, daysAmount) => {
  if (arr.length > 2) {
    const compactedArr = [];
    compactedArr.push(arr[0]);
    for (let i = 1; i < arr.length; i++) {
      if (compactedArr[compactedArr.length - 1].Date === arr[i].Date) {
        compactedArr[compactedArr.length - 1].Confirmed += arr[i].Confirmed;
        compactedArr[compactedArr.length - 1].Deaths += arr[i].Deaths;
      } else {
        compactedArr.push(arr[i]);
      }
    }

    const newArr = [];
    for (
      let i = compactedArr.length - 1, counter = 1;
      counter <= daysAmount && i > 0;
      i--
    ) {
      newArr.unshift({
        date: compactedArr[i].Date,
        newCases: compactedArr[i].Confirmed - compactedArr[i - 1].Confirmed,
        newDeaths: compactedArr[i].Deaths - compactedArr[i - 1].Deaths
      });

      counter++;
    }

    return newArr;
  }

  commit("setErrorMsg", "Array fetched is to short. please try again");
};

export const formatDateWithTime = date => date + "T00:00:00Z";

export const lastDaysToFromTo = lastDays => {
  const { subtractFromDate, formatDate } = date;

  let to = subtractFromDate(new Date(), {
    days: 1
  });
  to = formatDate(to, "YYYY-MM-DD");

  let from = subtractFromDate(to, {
    days: lastDays - 1
  });
  from = formatDate(from, "YYYY-MM-DD");

  return { from, to };
};
