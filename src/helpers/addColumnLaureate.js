function getMonthLimitAverage(fecha) {
  let date = new Date(fecha);
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().substring(0, 7);
}

export const addColumn = (data) => {
  data.forEach((item) => {
    let sum = 0;
    let count = 0;
    const monthSelect = getMonthLimitAverage(new Date());
    for (let i = 3; i <= 8; i++) {
      const value = item[`2023-0${i}`];
      if (value !== null) {
        sum += value;
        count++;
      }
    }

    for (let prop in item) {
      if (prop === monthSelect) {
        break;
      }
      if (item[prop] !== null && typeof item[prop] === "number") {
        sum += item[prop];
        count++;
      }
    }
    const average = count > 0 ? sum / count : null;
    item["Cumplimiento Acumulado"] = `${average.toFixed(2)}%`;
  });

  return data;
};
