import schedule from "node-schedule";
import { execSP } from "./controllers/spcontroller";


let rule = new schedule.RecurrenceRule();
rule.minute = 16;

const scheduleJob = schedule.scheduleJob(rule, async function(dateTime){
    console.log(dateTime)
    await execSP();
})