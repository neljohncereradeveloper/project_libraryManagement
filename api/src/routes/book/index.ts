import express from "express";
import { bookController } from "../../controllers";
import {
  validatePostRequest,
  validatePutRequest,
  validateDeleteRequest,
} from "../../middlewares/validation/book";
import { bookInputTransformer } from "../../middlewares/inputTransformer";
import { returnValidationErrors } from "../../helper";

const {
  searchBook,
  createBook,
  updateBook,
  deleteBook,
} = bookController;
const { transformCreateInput, transformUpdateInput } =
  bookInputTransformer;

/** book section main routes */
const router = express.Router();
router
  .route("/")
  .post(
    validatePostRequest,
    returnValidationErrors,
    transformCreateInput,
    createBook
  )
  .put(
    validatePutRequest,
    returnValidationErrors,
    transformUpdateInput,
    updateBook
  )
  .delete(validateDeleteRequest, returnValidationErrors, deleteBook);

router.route("/search").get(searchBook);
export default router;
