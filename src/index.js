import schedule from "node-schedule";
import { execSP } from "./controllers/spcontroller";
import { uploadFile } from "./controllers/drivecontroller";
import sendMail from "./controllers/mailcontroller";
import { createExcel } from "./controllers/excelcontroller";
import { reports } from "./arreglos/reports";
import { createZip } from "./controllers/zipcontroller";

// let rule = new schedule.RecurrenceRule();
// rule.minute = 31;

// const reportsCretae = schedule.scheduleJob(rule, async function (dateTime) {
//   console.log("El proceso se a comenzado a ejecutar.")
//   for (const report of reports) {
//     try {
//       const data = await execSP(report);
//       await createExcel(data[0], report);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   console.log("El proceso de creación de reportes fue hecho correctamente.")
// });

createZip()