import express from "express";
import { roleController } from "../../controllers";
import { returnValidationErrors } from "../../helper";
import { roleInputTransformer } from "../../middlewares/inputTransformer";
import { validatePostRequest } from "../../middlewares/validation/role";

const { createRole, searchRoles } = roleController;
const { transformCreateInput } = roleInputTransformer;

/** role main routes */
const router = express.Router();
router
  .route("/")
  .post(
    validatePostRequest,
    returnValidationErrors,
    transformCreateInput,
    createRole
  );

router.route("/search").get(searchRoles);
export default router;
