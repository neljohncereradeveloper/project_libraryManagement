import { Request, Response } from "express";
import { returnError, returnOk, getPaginationData } from "../../helper";
import {
  createRepo,
  deleteRepo,
  searchRepo,
  updateRepo,
} from "../../repository";
import { BookAuthorModel } from "../../models";
import { IBookAuthorProps, MBookAuthorProps } from "./../../types/models";
import {
  MODEL_BOOK_AUTHOR,
  RETURNING_COLUMNS_BOOK_AUTHOR,
  COLUMNS_BOOK_AUTHOR,
} from "../../constants";
import findByIdRepo from "../../repository/findById";

/**
 * Controller search bookauthor
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */

const searchBookAuthor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { text } = req.query;
  try {
    const page: number = parseInt(req.query.page as any) || 1;
    const take: number = parseInt(req.query.limit as any) || 5;
    const { count, result } = await searchRepo<MBookAuthorProps>(
      BookAuthorModel,
      MODEL_BOOK_AUTHOR,
      COLUMNS_BOOK_AUTHOR,
      {
        where: {
          con: "bookauthor.author ILIKE :text",
          value: { text: `%${text}%` },
        },
        whereAnd: [
          {
            con: "bookauthor.is_deleted = :value",
            value: { value: 0 },
          },
        ],
        skip: ((page as number) - 1) * take,
        take,
        orderBy: { value: "bookauthor.author", condition: "ASC" },
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
 * Controller create bookauthor
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const createBookAuthor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { bookauthorinput } = req.body;

  try {
    const bookauthor = await createRepo<MBookAuthorProps, IBookAuthorProps>(
      BookAuthorModel,
      [{ ...bookauthorinput }],
      RETURNING_COLUMNS_BOOK_AUTHOR
    );

    return returnOk(res, { data: bookauthor?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller update bookauthor
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateBookAuthor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  const { bookauthorinput } = req.body;
  try {
    /** validate bookauthorid */
    const bookauthorexist = await findByIdRepo<MBookAuthorProps>(
      BookAuthorModel,
      MODEL_BOOK_AUTHOR,
      id as string
    );
    if (!bookauthorexist) {
      return returnError(req, res, {
        table: MODEL_BOOK_AUTHOR,
      });
    }
    /** update book author */
    const bookauthor = await updateRepo<MBookAuthorProps, IBookAuthorProps>(
      BookAuthorModel,
      bookauthorinput,
      id as string,
      RETURNING_COLUMNS_BOOK_AUTHOR
    );
    return returnOk(res, { data: bookauthor?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller delete bookauthor
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const deleteBookAuthor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  try {
    /** validate bookauthorid */
    const bookauthorexist = await findByIdRepo<MBookAuthorProps>(
      BookAuthorModel,
      MODEL_BOOK_AUTHOR,
      id as string
    );
    if (!bookauthorexist) {
      return returnError(req, res, {
        table: MODEL_BOOK_AUTHOR,
      });
    }
    const bookauthor = await deleteRepo<MBookAuthorProps>(
      BookAuthorModel,
      id as string,
      RETURNING_COLUMNS_BOOK_AUTHOR
    );
    return returnOk(res, { data: bookauthor });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

export default {
  searchBookAuthor,
  createBookAuthor,
  updateBookAuthor,
  deleteBookAuthor,
};
