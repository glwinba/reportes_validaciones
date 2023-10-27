import logger from "../configs/logger.js";
import { sendMailError } from "./mailcontroller.js";

export const notificationMailError = async (getError) => {
  try {
    await sendMailError(getError);
    logger.error(getError);
  } catch (error) {
    logger.error(error);
  }
  
};
