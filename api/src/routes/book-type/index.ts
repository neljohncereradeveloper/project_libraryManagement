import express from "express";
import { bookTypeController } from "../../controllers";
import {
  validatePostRequest,
  validatePutRequest,
  validateDeleteRequest,
} from "../../middlewares/validation/book-type";
import { bookTypeInputTransformer } from "../../middlewares/inputTransformer";
import { returnValidationErrors } from "../../helper";

const {
  searchBookType,
  createBookType,
  updateBookType,
  deleteBookType,
} = bookTypeController;
const { transformCreateInput, transformUpdateInput } =
  bookTypeInputTransformer;

/** book section main routes */
const router = express.Router();
router
  .route("/")
  .post(
    validatePostRequest,
    returnValidationErrors,
    transformCreateInput,
    createBookType
  )
  .put(
    validatePutRequest,
    returnValidationErrors,
    transformUpdateInput,
    updateBookType
  )
  .delete(validateDeleteRequest, returnValidationErrors, deleteBookType);

router.route("/search").get(searchBookType);
export default router;
