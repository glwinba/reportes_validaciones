import logger from "../configs/logger";
import { sendMailError } from "./mailcontroller";

export const notificationMailError = async (getError) => {
  try {
    await sendMailError(getError);
    logger.error(getError);
  } catch (error) {
    logger.error(error);
  }
  
};
