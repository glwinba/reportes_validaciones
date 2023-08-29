import schedule from "node-schedule";
import { createDocumentSpecialValidations, createReportCallCenter, createReportsDaily, createReportsValidationsDaily } from "./controllers/jobscontroller";
import config from "./config";

schedule.scheduleJob(config.TIME_EXEC, async function (dateTime) {
  await createReportsDaily();
});

schedule.scheduleJob(config.TIME_EXEC_REPORTS, async function (dateTime) {
  await createDocumentSpecialValidations();
  await createReportsValidationsDaily();
  await createReportCallCenter();
});



