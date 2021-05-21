import { date } from "quasar";

export const mergeSubCountries = arr => {
  if (arr.length > 1) {
    let compactedArr = [];
    compactedArr.push(arr[0]);
    for (let i = 1; i < arr.length; i++) {
      if (compactedArr[compactedArr.length - 1].Date === arr[i].Date) {
        compactedArr[compactedArr.length - 1].Confirmed += arr[i].Confirmed;
        compactedArr[compactedArr.length - 1].Deaths += arr[i].Deaths;
      } else {
        compactedArr.push(arr[i]);
      }
    }

    compactedArr = compactedArr.map(element => ({
      date: element.Date,
      cases: element.Confirmed,
      deaths: element.Deaths
    }));

    return compactedArr;
  }

  return arr;
};

export const calcDiff = arr => {
  const compactedArr = mergeSubCountries(arr);
  if (compactedArr.length > 1) {
    const diffArr = [];
    for (let i = compactedArr.length - 1; i > 0; i--) {
      diffArr.unshift({
        date: compactedArr[i].date,
        cases: compactedArr[i].cases - compactedArr[i - 1].cases,
        deaths: compactedArr[i].deaths - compactedArr[i - 1].deaths
      });
    }
    return diffArr;
  }

  return arr;
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
