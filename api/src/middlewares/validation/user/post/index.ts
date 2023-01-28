import { body, ValidationChain } from "express-validator";
import {
  FIELD_FIRSTNAME,
  FIELD_IDNUMBER,
  FIELD_LASTNAME,
  FIELD_MIDDLENAME,
  FIELD_USERNAME,
} from "../../../../constants";

const validatePostRequest: ValidationChain[] = [
  body(FIELD_IDNUMBER)
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
  body(FIELD_FIRSTNAME)
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
  body(FIELD_MIDDLENAME)
    .rtrim()
    .isString()
    .isLength({
      max: 40,
      min: 1,
    })
    .withMessage(
      "Must be string.Minimum of 1 characters.Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
  body(FIELD_LASTNAME)
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
  body(FIELD_USERNAME)
    .rtrim()
    .isString()
    .isLength({
      max: 20,
      min: 4,
    })
    .withMessage(
      "Must be a string,Minimum of 4 characters,Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
];

export default validatePostRequest;
