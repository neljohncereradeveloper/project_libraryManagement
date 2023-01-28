import { body, ValidationChain, query } from "express-validator";
import { FIELD_USERNAME } from "./../../../../constants/index";

const validatePutRequest: ValidationChain[] = [
  query("id").isUUID().rtrim().withMessage("Must be a valid id"),
  body("roleid").isUUID().rtrim().withMessage("Must be a valid role id"),
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

export default validatePutRequest;
