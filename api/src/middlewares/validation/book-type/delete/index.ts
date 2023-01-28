import { ValidationChain, query } from "express-validator";

const validateDeleteRequest: ValidationChain[] = [
  query("id").isUUID().rtrim().withMessage("Must be a valid id"),
];

export default validateDeleteRequest;
