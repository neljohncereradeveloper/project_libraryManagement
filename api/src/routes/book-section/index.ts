import express from "express";
import { bookSectionController } from "../../controllers";
import {
  validatePostRequest,
  validatePutRequest,
  validateDeleteRequest,
} from "../../middlewares/validation/book-section";
import { bookSectionInputTransformer } from "../../middlewares/inputTransformer";
import { returnValidationErrors } from "../../helper";

const {
  searchBookSection,
  createBookSection,
  updateBookSection,
  deleteBookSection,
} = bookSectionController;
const { transformCreateInput, transformUpdateInput } =
  bookSectionInputTransformer;

/** book section main routes */
const router = express.Router();
router
  .route("/")
  .post(
    validatePostRequest,
    returnValidationErrors,
    transformCreateInput,
    createBookSection
  )
  .put(
    validatePutRequest,
    returnValidationErrors,
    transformUpdateInput,
    updateBookSection
  )
  .delete(validateDeleteRequest, returnValidationErrors, deleteBookSection);

router.route("/search").get(searchBookSection);
export default router;
