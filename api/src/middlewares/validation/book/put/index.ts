import { body, ValidationChain, query } from "express-validator";
import {
  FIELD_BOOK_ACCOUNTNUMBER,
  FIELD_BOOK_BOOKID,
  FIELD_BOOK_BOOKTYPEID,
  FIELD_BOOK_COPYRIGHTYEAR,
  FIELD_BOOK_DEWYDECIMAL,
  FIELD_BOOK_ISBNNUMBER,
  FIELD_BOOK_PLACEOFPUBLICATION,
  FIELD_BOOK_PUBLISHER,
  FIELD_BOOK_SECTIONID,
  FIELD_BOOK_STATUSID,
  FIELD_BOOK_TITLE,
} from "../../../../constants";

const validatePutRequest: ValidationChain[] = [
  query("id").isUUID().rtrim().withMessage("Must be a valid id"),
  body(FIELD_BOOK_BOOKID)
    .rtrim()
    .isString()
    .isLength({
      max: 40,
      min: 4,
    })
    .withMessage(
      "Must be string.Minimum of 4 characters.Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
  body(FIELD_BOOK_TITLE)
    .rtrim()
    .isString()
    .isLength({
      max: 40,
      min: 4,
    })
    .withMessage(
      "Must be string.Minimum of 4 characters.Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
  body(FIELD_BOOK_ACCOUNTNUMBER)
    .rtrim()
    .isString()
    .isLength({
      max: 40,
      min: 4,
    })
    .withMessage(
      "Must be string.Minimum of 4 characters.Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
  body(FIELD_BOOK_ISBNNUMBER)
    .rtrim()
    .isString()
    .isLength({
      max: 40,
      min: 4,
    })
    .withMessage(
      "Must be string.Minimum of 4 characters.Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
  body(FIELD_BOOK_SECTIONID)
    .isUUID()
    .rtrim()
    .withMessage("Must be a valid section id"),
  body(FIELD_BOOK_DEWYDECIMAL).isNumeric(),
  body(FIELD_BOOK_PUBLISHER)
    .rtrim()
    .isString()
    .isLength({
      max: 40,
      min: 4,
    })
    .withMessage(
      "Must be string.Minimum of 4 characters.Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
  body(FIELD_BOOK_PLACEOFPUBLICATION)
    .rtrim()
    .isString()
    .isLength({
      max: 40,
      min: 4,
    })
    .withMessage(
      "Must be string.Minimum of 4 characters.Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
  body(FIELD_BOOK_COPYRIGHTYEAR).isNumeric(),
  body(FIELD_BOOK_STATUSID)
    .isUUID()
    .rtrim()
    .withMessage("Must be a valid status id"),
  body(FIELD_BOOK_BOOKTYPEID)
    .isUUID()
    .rtrim()
    .withMessage("Must be a valid booktype id"),
];

export default validatePutRequest;
