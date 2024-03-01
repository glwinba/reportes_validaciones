import schedule from "node-schedule";
import { createDailyReportLaureate, createDocumentSpecialValidations, createReportsDaily, createReportsValidationsDaily } from "./controllers/jobscontroller.js";
import config from "./config.js";

schedule.scheduleJob(config.TIME_EXEC, async function (dateTime) {
  await createReportsDaily();
});

schedule.scheduleJob(config.TIME_EXEC_REPORTS, async function (dateTime) {
  await createDocumentSpecialValidations();
  await createReportsValidationsDaily();
  await createDailyReportLaureate();
});

createDailyReportLaureate();