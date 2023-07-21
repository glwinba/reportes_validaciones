import schedule from "node-schedule";
import { execSP } from "./controllers/spcontroller";
import sendMail from "./controllers/mailcontroller";
import { createExcel } from "./controllers/excelcontroller";
import { reports } from "./arreglos/reports";
import { createZip, createZip2 } from "./controllers/zipcontroller";
import { removeFiles, removeZip } from "./controllers/filecontroller";
import sendMail2 from "./controllers/mailcontroller";

// let rule = new schedule.RecurrenceRule();
// rule.minute = 20;

// let timeExect = "45 23 * * *";
// schedule.scheduleJob(timeExect, async function (dateTime) {
//   console.log("El proceso se a comenzado a ejecutar.");
//   let nameFiles = [];

//   for (const report of reports) {
//     try {
//       const data = await execSP(report);
//       const excel = await createExcel(data[0], report);
//       nameFiles.push(excel);
//     } catch (error) {
//       console.log(error);
//     }
//   }

  console.log("Se ejecuto este proceso")

  setTimeout(async () => {
    await createZip();
    await createZip2();
    await removeFiles(nameFiles);
    await sendMail();
    await sendMail2();
    await removeZip();
    console.log("El proceso de creación de reportes fue hecho correctamente.");
  }, 100000);
});

const init = async ()=>{
  console.log("El proceso se a comenzado a ejecutar.");
  let nameFiles = [];

  for (const report of reports) {
    try {
      const data = await execSP(report);
      const excel = await createExcel(data[0], report);
      console.log(excel);
      // nameFiles.push(excel);
    } catch (error) {
      console.log(error);
    }
  }

  console.log("Se ejecuto este proceso")
}

init();