import express from "express";
import { bookCategoryController } from "../../controllers";
import {
  validatePostRequest,
  validatePutRequest,
  validateDeleteRequest,
} from "../../middlewares/validation/book-category";
import { bookCategoryInputTransformer } from "../../middlewares/inputTransformer";
import { returnValidationErrors } from "../../helper";

const {
  searchBookCategory,
  createBookCategory,
  updateBookCategory,
  deleteBookCategory,
} = bookCategoryController;
const { transformCreateInput, transformUpdateInput } =
  bookCategoryInputTransformer;

/** book section main routes */
const router = express.Router();
router
  .route("/")
  .post(
    validatePostRequest,
    returnValidationErrors,
    transformCreateInput,
    createBookCategory
  )
  .put(
    validatePutRequest,
    returnValidationErrors,
    transformUpdateInput,
    updateBookCategory
  )
  .delete(validateDeleteRequest, returnValidationErrors, deleteBookCategory);

router.route("/search").get(searchBookCategory);
export default router;
