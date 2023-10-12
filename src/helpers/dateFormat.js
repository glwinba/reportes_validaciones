const letter_month = [
  "ENERO",
  "FEBRERO",
  "MARZO",
  "ABRIL",
  "MAYO",
  "JUNIO",
  "JULIO",
  "AGOSTO",
  "SEPTIEMBRE",
  "OCTUBRE",
  "NOVIEMBRE",
  "DICIEMBRE",
];

export const formatDate = (FECHA) => {
  if (FECHA != "") {
    let day = FECHA.split("-")[2];
    let month = FECHA.split("-")[1];
    let year = FECHA.split("-")[0];
    return `${day}/${month}/${year}`;
  } else {
    return "";
  }
};

const getYesterday = () => {
  const today = new Date();
  const milisecondsforday = 24 * 60 * 60 * 1000;
  let yesterday = new Date(today.getTime() - milisecondsforday);
  return yesterday.toLocaleDateString();
}

export const dateFile = () => {
  let yesterday = getYesterday();
  let day = yesterday.split("/")[0];
  let month = yesterday.split("/")[1];
  let year = yesterday.split("/")[2];

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}_${month}_${day}`;
};

export const dateFilesReports = () => {
  const today = new Date().toLocaleDateString("es-MX");
  let day = today.split("/")[0];
  let month = today.split("/")[1];
  let year = today.split("/")[2];

  if (day < 10) {
    day = `0${day}`;
  }

  return `${day} ${letter_month[month - 1]} ${year} `;
};
