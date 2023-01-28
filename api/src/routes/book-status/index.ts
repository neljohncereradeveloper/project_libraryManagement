import express from "express";
import { bookStatusController } from "../../controllers";
import {
  validatePostRequest,
  validatePutRequest,
  validateDeleteRequest,
} from "../../middlewares/validation/book-status";
import { bookStatusInputTransformer } from "../../middlewares/inputTransformer";
import { returnValidationErrors } from "../../helper";

const {
  searchBookStatus,
  createBookStatus,
  updateBookStatus,
  deleteBookStatus,
} = bookStatusController;
const { transformCreateInput, transformUpdateInput } =
  bookStatusInputTransformer;

/** book section main routes */
const router = express.Router();
router
  .route("/")
  .post(
    validatePostRequest,
    returnValidationErrors,
    transformCreateInput,
    createBookStatus
  )
  .put(
    validatePutRequest,
    returnValidationErrors,
    transformUpdateInput,
    updateBookStatus
  )
  .delete(validateDeleteRequest, returnValidationErrors, deleteBookStatus);

router.route("/search").get(searchBookStatus);
export default router;
