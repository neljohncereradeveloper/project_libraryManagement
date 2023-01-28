import express from "express";
import { accountInputTransformer } from "../../middlewares/inputTransformer";
import { returnValidationErrors } from "../../helper";
import { accountController } from "../../controllers";
import { validatePutRequest } from "../../middlewares/validation/account";

const { updateAccount, searchAccounts } = accountController;
const { transformUpdateInput } = accountInputTransformer;

/** account main routes */
const router = express.Router();
router
  .route("/")
  .put(
    validatePutRequest,
    returnValidationErrors,
    transformUpdateInput,
    updateAccount
  );

router.route("/search").get(searchAccounts);

export default router;
