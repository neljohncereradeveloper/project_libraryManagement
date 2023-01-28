import { Response, Request } from "express";
import { logger } from "../utils";

type StatusCode = 500 | 400;
type OptionalProps = {
  statusCode?: StatusCode;
  msg?: string;
  table?: string;
  error?: any;
};
/**
 *  errors for status code 400 | 500
 *
 * @param req
 * @param res
 * @param statusCode
 * @param {}
 */
const returnError = (
  req: Request,
  res: Response,
  { table, error }: OptionalProps
): any => {
  // console.log("error : ", error);
  if (table) {
    // logging
    logger.warn(
      `400 - Not Found Error - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    return res.status(400).json({
      errors: [
        {
          msg: `${table} not found`,
        },
      ],
    });
  }
  switch (error?.code) {
    case "23503": // NOT FOUND PRIMARY KEY ERROR
      if (error?.detail.includes("is not present in table")) {
        // logging
        logger.warn(
          `400 - Not Found Error - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        const detail: string = error.detail;
        const detail_1: string[] = detail.split("table ");
        const table = detail_1[1].split(".").join(""); // table name
        return res.status(400).json({
          errors: [
            {
              msg: `${table} not found`,
            },
          ],
        });
      }
      break;
    case "23505": // DUPLICATE ERROR
      if (error?.detail.includes("already exists.")) {
        // logging
        logger.warn(
          `400 - Duplicate Error - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        const detail: string = error.detail;
        const detail_1: string[] = detail.split("=");
        const keyfield = detail_1[0].split(" ");
        const remove_parenthesis_left = keyfield[1].split("(").join("");
        const field = remove_parenthesis_left.split(")").join(""); // field name
        return res.status(400).json({
          errors: [
            {
              msg: `${field} already exist`,
            },
          ],
        });
      }
      break;
    default:
      // logging
      logger.error(
        `500 - Internal Server Error - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      return res.status(500).json({
        errors: [
          {
            msg: "Internal Server Error",
          },
        ],
      });
      break;
  }
  return;
};

export default returnError;
