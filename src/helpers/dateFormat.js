export const formatDate = (FECHA) => {
     
    if (FECHA != "") {
      let day = FECHA.split("-")[2];
      let month = FECHA.split("-")[1];
      let year = FECHA.split("-")[0];
      return `${day}/${month}/${year}`;
    } else {
      return "";
    }
}

export const dateFile = () => {
  const today = new Date().toLocaleDateString("es-MX");
  let day = today.split("/")[0];
  let month = today.split("/")[1];
  let year = today.split("/")[2];

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}_${month}_${day}`
}