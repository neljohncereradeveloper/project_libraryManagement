import { Request, Response } from "express";
import { returnError, returnOk, getPaginationData } from "../../helper";
import {
  createRepo,
  deleteRepo,
  searchRepo,
  updateRepo,
} from "../../repository";
import { BookSectionModel } from "../../models";
import { IBookSectionProps, MBookSectionProps } from "./../../types/models";
import {
  MODEL_BOOK_SECTION,
  RETURNING_COLUMNS_BOOK_SECTION,
  COLUMNS_BOOK_SECTION,
} from "../../constants";
import findByIdRepo from "../../repository/findById";

/**
 * Controller search booksections
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */

const searchBookSection = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { text } = req.query;
  try {
    const page: number = parseInt(req.query.page as any) || 1;
    const take: number = parseInt(req.query.limit as any) || 5;
    const { count, result } = await searchRepo<MBookSectionProps>(
      BookSectionModel,
      MODEL_BOOK_SECTION,
      COLUMNS_BOOK_SECTION,
      {
        where: {
          con: "booksection.section ILIKE :text",
          value: { text: `%${text}%` },
        },
        whereAnd: [
          { con: "booksection.is_deleted = :value", value: { value: 0 } },
        ],
        skip: ((page as number) - 1) * take,
        take,
        orderBy: { value: "booksection.section", condition: "ASC" },
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
 * Controller create booksection
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const createBookSection = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { booksectioninput } = req.body;

  try {
    const booksection = await createRepo<MBookSectionProps, IBookSectionProps>(
      BookSectionModel,
      [{ ...booksectioninput }],
      RETURNING_COLUMNS_BOOK_SECTION
    );

    return returnOk(res, { data: booksection?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller update booksection
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateBookSection = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  const { booksectioninput } = req.body;
  try {
    /** validate booksectionid */
    const booksectionexist = await findByIdRepo<MBookSectionProps>(
      BookSectionModel,
      MODEL_BOOK_SECTION,
      id as string
    );
    if (!booksectionexist) {
      return returnError(req, res, {
        table: MODEL_BOOK_SECTION,
      });
    }
    /** update book section */
    const booksection = await updateRepo<MBookSectionProps, IBookSectionProps>(
      BookSectionModel,
      booksectioninput,
      id as string,
      RETURNING_COLUMNS_BOOK_SECTION
    );
    return returnOk(res, { data: booksection?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller delete booksection
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const deleteBookSection = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  try {
    /** validate booksectionid */
    const booksectionexist = await findByIdRepo<MBookSectionProps>(
      BookSectionModel,
      MODEL_BOOK_SECTION,
      id as string
    );
    if (!booksectionexist) {
      return returnError(req, res, {
        table: MODEL_BOOK_SECTION,
      });
    }
    /** delete book section */
    const booksection = await deleteRepo<MBookSectionProps>(
      BookSectionModel,
      id as string,
      RETURNING_COLUMNS_BOOK_SECTION
    );
    return returnOk(res, { data: booksection });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

export default {
  searchBookSection,
  createBookSection,
  updateBookSection,
  deleteBookSection,
};
