import express from "express";
import { userController } from "../../controllers";
import {
  validatePostRequest,
  validatePutRequest,
} from "../../middlewares/validation/user";
import { userInputTransformer } from "../../middlewares/inputTransformer";
import { returnValidationErrors } from "../../helper";

const { createUser, updateUser, searchUsers } = userController;
const { transformCreateInput, transformUpdateInput } = userInputTransformer;

/** user main routes */
const router = express.Router();
router
  .route("/")
  .post(
    validatePostRequest,
    returnValidationErrors,
    transformCreateInput,
    createUser
  )
  .put(
    validatePutRequest,
    returnValidationErrors,
    transformUpdateInput,
    updateUser
  );
router.route("/search").get(searchUsers);

export default router;
