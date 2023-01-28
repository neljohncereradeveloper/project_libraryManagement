import { ValidationChain, query, param } from "express-validator";
import { FIELD_FIRSTNAME } from "./../../../../constants/index";

const validateGetRequestFullname: ValidationChain[] = [
  query(FIELD_FIRSTNAME).rtrim().isString().toLowerCase(),
];
const validateGetRequestId: ValidationChain[] = [
  param("id").isMongoId().rtrim().withMessage("Must be a valid id"),
];

export default { validateGetRequestFullname, validateGetRequestId };
