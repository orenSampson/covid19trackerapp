import { date } from "quasar";

export const calcDiff = arr => {
  if (arr.length > 1) {
    const diffArr = [];
    for (let i = arr.length - 1; i > 0; i--) {
      diffArr.unshift({
        date: arr[i].date,
        cases: arr[i].cases - arr[i - 1].cases,
        deaths: arr[i].deaths - arr[i - 1].deaths
      });
    }
    return diffArr;
  }

  return arr;
};

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
