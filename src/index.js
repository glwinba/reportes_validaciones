import schedule from "node-schedule";
import { execSP } from "./controllers/spcontroller";
import { createExcel } from "./controllers/excelcontroller";
import { reports } from "./arreglos/reports";
import { createZip } from "./controllers/zipcontroller";
import {
  fileZipExist,
  removeFiles,
  removeZip,
} from "./controllers/filecontroller";
import { notificationMail } from "./controllers/notificationcontroller";
import config from "./config";
import { dateFile } from "./helpers/dateFormat";

schedule.scheduleJob(config.TIME_EXEC, async function (dateTime) {
  console.log("El proceso se a comenzado a ejecutar.");
  let nameFiles = [];
  const dateFileName = dateFile();
  await fileZipExist();
  for (const report of reports) {
    try {
      const data = await execSP(report);
      const excel = await createExcel(data[0], report, dateFileName);
      nameFiles.push(excel);
    } catch (error) {
      console.log(error);
    }
  }

  await createZip();
  await removeFiles(nameFiles);
  await notificationMail(dateFileName);
  await removeZip();
  console.log(
    "******** El proceso de creación de reportes fue hecho correctamente. **********"
  );
});
