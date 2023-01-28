import express from "express";
import { bookAuthorController } from "../../controllers";
import {
  validatePostRequest,
  validatePutRequest,
  validateDeleteRequest,
} from "../../middlewares/validation/book-author";
import { bookAuthorInputTransformer } from "../../middlewares/inputTransformer";
import { returnValidationErrors } from "../../helper";

const {
  searchBookAuthor,
  createBookAuthor,
  updateBookAuthor,
  deleteBookAuthor,
} = bookAuthorController;
const { transformCreateInput, transformUpdateInput } =
  bookAuthorInputTransformer;

/** book section main routes */
const router = express.Router();
router
  .route("/")
  .post(
    validatePostRequest,
    returnValidationErrors,
    transformCreateInput,
    createBookAuthor
  )
  .put(
    validatePutRequest,
    returnValidationErrors,
    transformUpdateInput,
    updateBookAuthor
  )
  .delete(validateDeleteRequest, returnValidationErrors, deleteBookAuthor);

router.route("/search").get(searchBookAuthor);
export default router;
