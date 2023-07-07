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
