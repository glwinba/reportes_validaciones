import schedule from "node-schedule";
import { execSP } from "./controllers/spcontroller";
import { uploadFile } from "./controllers/drivecontroller";
import sendMail from "./controllers/mailcontroller";
import { createExcel } from "./controllers/excelcontroller";

let rule = new schedule.RecurrenceRule();
rule.minute = 15;

const scheduleJobRun = schedule.scheduleJob(rule, async function (dateTime) {
  console.log(dateTime);
  for (const iterator of object) {
    
  }
  try {
    const data = await execSP();
    await createExcel(data[0]);
  } catch (error) {
    console.log(error)
  }
});
