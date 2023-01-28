import { MODEL_BOOK_STATUS } from "./../../constants/index";
import { Request, Response } from "express";
import { returnError, returnOk, getPaginationData } from "../../helper";
import {
  createRepo,
  deleteRepo,
  findOneRepo,
  searchRepo,
  updateRepo,
} from "../../repository";
import { BookModel } from "../../models";
import { IBookProps, MBookProps } from "./../../types/models";
import {
  MODEL_BOOK,
  RETURNING_COLUMNS_BOOK,
  COLUMNS_BOOK,
  MODEL_BOOK_TYPE,
  MODEL_BOOK_SECTION,
} from "../../constants";
import findByIdRepo from "../../repository/findById";

/**
 * Controller search book
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */

const searchBook = async (req: Request, res: Response): Promise<Response> => {
  const { text } = req.query;
  try {
    const page: number = parseInt(req.query.page as any) || 1;
    const take: number = parseInt(req.query.limit as any) || 5;
    const { count, result } = await searchRepo<MBookProps>(
      BookModel,
      MODEL_BOOK,
      COLUMNS_BOOK,
      {
        innerJoin: [
          { refModel: "book.booktype", model: MODEL_BOOK_TYPE },
          { refModel: "book.bookstatus", model: MODEL_BOOK_STATUS },
          { refModel: "book.booksection", model: MODEL_BOOK_SECTION },
        ],
        where: {
          con: "book.title ILIKE :text",
          value: { text: `%${text}%` },
        },
        skip: ((page as number) - 1) * take,
        take,
        orderBy: { value: "book.title", condition: "ASC" },
      }
    );
    if (count > 0) {
      const { currentPage, totalPages, nextPage, previousPage } =
        getPaginationData(count, page as any, take);
      return returnOk(res, {
        info: {
          count,
          totalPages,
          currentPage,
          nextPage,
          previousPage,
        },
        data: result,
      });
    }
    return returnOk(res, {
      data: null,
    });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller create book
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const createBook = async (req: Request, res: Response): Promise<Response> => {
  const { bookinput } = req.body;

  try {
    const book = await createRepo<MBookProps, IBookProps>(
      BookModel,
      [{ ...bookinput }],
      RETURNING_COLUMNS_BOOK
    );
    /** retrieve updated book for react query purpose */
    const { result } = await findOneRepo<MBookProps>(BookModel, MODEL_BOOK, {
      tableColumns: COLUMNS_BOOK,
      innerJoin: [
        { refModel: "book.booktype", model: MODEL_BOOK_TYPE },
        { refModel: "book.bookstatus", model: MODEL_BOOK_STATUS },
        { refModel: "book.booksection", model: MODEL_BOOK_SECTION },
      ],
      where: {
        con: "book.id = :value",
        value: { value: book?.raw[0].id },
      },
    });
    return returnOk(res, { data: result });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller update book
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateBook = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.query;
  const { bookinput } = req.body;
  try {
    /** validate bookid */
    const bookexist = await findByIdRepo<MBookProps>(
      BookModel,
      MODEL_BOOK,
      id as string
    );
    if (!bookexist) {
      return returnError(req, res, {
        table: MODEL_BOOK,
      });
    }
    const book = await updateRepo<MBookProps, IBookProps>(
      BookModel,
      bookinput,
      id as string,
      RETURNING_COLUMNS_BOOK
    );
    /** retrieve updated book for react query purpose */
    const { result } = await findOneRepo<MBookProps>(BookModel, MODEL_BOOK, {
      tableColumns: COLUMNS_BOOK,
      innerJoin: [
        { refModel: "book.booktype", model: MODEL_BOOK_TYPE },
        { refModel: "book.bookstatus", model: MODEL_BOOK_STATUS },
        { refModel: "book.booksection", model: MODEL_BOOK_SECTION },
      ],
      where: {
        con: "book.id = :value",
        value: { value: book?.raw[0].id },
      },
    });
    return returnOk(res, { data: result });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller delete book
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const deleteBook = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.query;
  try {
    const book = await deleteRepo<MBookProps>(
      BookModel,
      id as string,
      RETURNING_COLUMNS_BOOK
    );
    return returnOk(res, { data: book });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

export default {
  searchBook,
  createBook,
  updateBook,
  deleteBook,
};
