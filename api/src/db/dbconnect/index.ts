import { logger } from "../../utils";
import datasource from "../datasource";

const dbconnect = async () => {
  try {
    await datasource.initialize();
    console.log("Postgres Connected");
    logger.info("Postgres Connected");
  } catch (error) {
    console.log("error : ", error);
    logger.error("Could not connect to Postgres");
    process.exit(1);
  }
};

export default dbconnect;
