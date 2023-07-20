import fs from "fs";

export const removeFiles = async (files) => {
  for (const file of files) {
    fs.rm(file, function (err) {
      if (err) console.log(err);
      else console.log("Archivo borrado del servidor correctamente");
    });
  }
};

export const removeZip = async (files) => {
    fs.rm("reportes.zip", function (err) {
      if (err) console.log('Archivo ZIP no se pude eliminar', err);
      else console.log("Archivo ZIP borrado correctamente del servidor.");
    });  

    fs.rm("reportes2.zip", function (err) {
      if (err) console.log('Archivo ZIP no se pude eliminar', err);
      else console.log("Archivo ZIP borrado correctamente del servidor.");
    }); 
};
