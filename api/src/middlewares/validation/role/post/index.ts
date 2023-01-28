import { FIELD_NAME } from "./../../../../constants";
import { body, ValidationChain } from "express-validator";

const validatePostRequest: ValidationChain[] = [
  body(FIELD_NAME)
    .rtrim()
    .isString()
    .isLength({
      max: 40,
      min: 4,
    })
    .withMessage(
      "Must be string.Minimum of 4 characters.Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
];

export default validatePostRequest;
