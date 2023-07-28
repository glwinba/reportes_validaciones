import { dataZip } from "../arreglos/reports";
import logger from "../configs/logger";
import { sendMail, sendMailError } from "./mailcontroller";

export const notificationMail = async (dateFileName) => {
  for (const data of dataZip) {
    try {
      await sendMail(data.type, data.name, dateFileName);
      logger.info(`Mails enviados.`);
    } catch (error) {
      notificationMailError(`Error en el envio de mails: ${error}`);
    } 
  }
};

export const notificationMailError = async (getError) => {
  try {
    await sendMailError(getError);
    logger.error(getError);
  } catch (error) {
    logger.error(error);
  }
  
};
