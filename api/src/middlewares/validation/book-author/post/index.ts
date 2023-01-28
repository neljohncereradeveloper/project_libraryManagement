import { body, ValidationChain } from "express-validator";
import { FIELD_BOOK_AUTHOR } from "../../../../constants";

const validatePostRequest: ValidationChain[] = [
  body(FIELD_BOOK_AUTHOR)
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
