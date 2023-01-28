export const IS_PROD = process.env.NODE_ENV === "production" ? true : false;
export const PORT = 3001 || process.env.PORT!;
export const ROLE_ARRAY = [
  "student",
  "admin",
  "teacher",
  "staff",
  "superadmin",
  "developer",
];

/**
 * MODEL names
 */
export const MODEL_ACCOUNT = "account";
export const MODEL_ROLE = "role";
export const MODEL_USER = "user";
export const MODEL_ATTENDANCE = "attendance";
export const MODEL_ATTENDANCE_STATUS = "attendancestatus";
export const MODEL_BOOK = "book";
export const MODEL_BOOK_CATEGORY = "bookcategory";
export const MODEL_BOOKS_CATEGORIES = "books_categories";
export const MODEL_BOOK_AUTHOR = "bookauthor";
export const MODEL_BOOKS_AUTHORS = "books_authors";
export const MODEL_BOOK_SECTION = "booksection";
export const MODEL_BOOK_TYPE = "booktype";
export const MODEL_BOOK_STATUS = "bookstatus";
export const MODEL_BORROWERS = "borrowers";
export const MODEL_BORROWER_STATUS = "borrowerstatus";
/**
 * Columns table
 */
export const COLUMNS_USER = [
  "user.id",
  "user.idnumber",
  "user.firstname",
  "user.middlename",
  "user.lastname",
  "account.username",
  "role.name",
];
export const COLUMNS_ACCOUNT = ["account.id", "account.username", "role.name"];
export const COLUMNS_ROLE = ["role.id", "role.name"];
export const COLUMNS_BOOK_SECTION = ["booksection.id", "booksection.section"];
export const COLUMNS_BOOK_STATUS = ["bookstatus.id", "bookstatus.status"];
export const COLUMNS_BOOK_TYPE = ["booktype.id", "booktype.type"];
export const COLUMNS_BOOK_AUTHOR = ["bookauthor.id", "bookauthor.author"];
export const COLUMNS_BOOK_CATEGORY = [
  "bookcategory.id",
  "bookcategory.category",
];
export const COLUMNS_BOOK = [
  "book.id",
  "book.bookid",
  "book.title",
  "book.accountnumber",
  "book.isbnnumber",
  "booksection.section",
  "book.dewydecimal",
  "book.publisher",
  "book.placeofpublication",
  "book.copyrightyear",
  "bookstatus.status",
  "booktype.type",
];
/**
 * Returning Columns table
 */
export const RETURNING_COLUMNS_USER =
  "id,idnumber,firstname,middlename,lastname";
export const RETURNING_COLUMNS_ACCOUNT = "id,username";
export const RETURNING_COLUMNS_ROLE = "id,name";
export const RETURNING_COLUMNS_BOOK_SECTION = "id,section";
export const RETURNING_COLUMNS_BOOK_STATUS = "id,status";
export const RETURNING_COLUMNS_BOOK_TYPE = "id,type";
export const RETURNING_COLUMNS_BOOK_AUTHOR = "id,author";
export const RETURNING_COLUMNS_BOOK_CATEGORY = "id,category";
export const RETURNING_COLUMNS_BOOK =
  "id,bookid,title,accountnumber,isbnnumber,sectionid,dewydecimal,publisher,placeofpublication,copyrightyear,statusid,booktypeid";
/**
 * FIELDS names
 */
export const FIELD_FIRSTNAME = "firstname";
export const FIELD_MIDDLENAME = "middlename";
export const FIELD_LASTNAME = "lastname";
export const FIELD_IDNUMBER = "idnumber";
export const FIELD_USERNAME = "username";
export const FIELD_NAME = "name";
export const FIELD_BOOK_SECTION = "section";
export const FIELD_BOOK_STATUS = "status";
export const FIELD_BOOK_TYPE = "type";
export const FIELD_BOOK_AUTHOR = "author";
export const FIELD_BOOK_CATEGORY = "category";
export const FIELD_BOOK_BOOKID = "bookid";
export const FIELD_BOOK_TITLE = "title";
export const FIELD_BOOK_ACCOUNTNUMBER = "accountnumber";
export const FIELD_BOOK_ISBNNUMBER = "isbnnumber";
export const FIELD_BOOK_DEWYDECIMAL = "dewydecimal";
export const FIELD_BOOK_PUBLISHER = "publisher";
export const FIELD_BOOK_PLACEOFPUBLICATION = "placeofpublication";
export const FIELD_BOOK_COPYRIGHTYEAR = "copyrightyear";
export const FIELD_BOOK_SECTIONID = "sectionid";
export const FIELD_BOOK_STATUSID = "statusid";
export const FIELD_BOOK_BOOKTYPEID = "booktypeid";
