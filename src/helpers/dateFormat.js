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