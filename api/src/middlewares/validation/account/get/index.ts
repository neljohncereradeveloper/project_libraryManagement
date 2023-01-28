import { ValidationChain, param } from "express-validator";

const validateParamIdRequest: ValidationChain[] = [
  param("id").isMongoId().rtrim().withMessage("Must be a valid id"),
];

export default validateParamIdRequest;
