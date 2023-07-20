import AdmZip from "adm-zip";

export const createZip = async () => {
  try {
    const zip = new AdmZip();

    zip.addLocalFolder("./src/controllers/excels", "excels");

    zip.writeZip('reportes.zip');

    console.log("Archivos comprimidos correctamente.")
  } catch (error) {
    console.log(error)
  }
};

export const createZip2 = async () => {
  try {
    const zip = new AdmZip();

    zip.addLocalFolder("./src/controllers/excels2", "excels2");

    zip.writeZip('reportes2.zip');

    console.log("Archivos comprimidos correctamente de excels 2.")
  } catch (error) {
    console.log(error)
  }
};
