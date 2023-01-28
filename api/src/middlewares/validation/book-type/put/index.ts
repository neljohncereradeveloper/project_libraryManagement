import { body, ValidationChain, query } from "express-validator";

import { FIELD_BOOK_TYPE } from "./../../../../constants";

const validatePutRequest: ValidationChain[] = [
  query("id").isUUID().rtrim().withMessage("Must be a valid id"),
  body(FIELD_BOOK_TYPE)
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

export default validatePutRequest;
