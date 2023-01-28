import { Request, Response } from "express";
import { returnError, returnOk, getPaginationData } from "../../helper";
import {
  createRepo,
  deleteRepo,
  searchRepo,
  updateRepo,
} from "../../repository";
import { BookStatusModel } from "../../models";
import { IBookStatusProps, MBookStatusProps } from "./../../types/models";
import {
  MODEL_BOOK_STATUS,
  RETURNING_COLUMNS_BOOK_STATUS,
  COLUMNS_BOOK_STATUS,
} from "../../constants";
import findByIdRepo from "../../repository/findById";

/**
 * Controller search bookstatus
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */

const searchBookStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { text } = req.query;
  try {
    const page: number = parseInt(req.query.page as any) || 1;
    const take: number = parseInt(req.query.limit as any) || 5;
    const { count, result } = await searchRepo<MBookStatusProps>(
      BookStatusModel,
      MODEL_BOOK_STATUS,
      COLUMNS_BOOK_STATUS,
      {
        where: {
          con: "bookstatus.status ILIKE :text",
          value: { text: `%${text}%` },
        },
        whereAnd: [
          { con: "bookstatus.is_deleted = :value", value: { value: 0 } },
        ],
        skip: ((page as number) - 1) * take,
        take,
        orderBy: { value: "bookstatus.status", condition: "ASC" },
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
 * Controller create bookstatus
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const createBookStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { bookstatusinput } = req.body;

  try {
    const bookstatus = await createRepo<MBookStatusProps, IBookStatusProps>(
      BookStatusModel,
      [{ ...bookstatusinput }],
      RETURNING_COLUMNS_BOOK_STATUS
    );

    return returnOk(res, { data: bookstatus?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller update bookstatus
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateBookStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  const { bookstatusinput } = req.body;
  try {
    /** validate bookstatusid */
    const bookstatusexist = await findByIdRepo<MBookStatusProps>(
      BookStatusModel,
      MODEL_BOOK_STATUS,
      id as string
    );
    if (!bookstatusexist) {
      return returnError(req, res, {
        table: MODEL_BOOK_STATUS,
      });
    }
    /** update book status */
    const bookstatus = await updateRepo<MBookStatusProps, IBookStatusProps>(
      BookStatusModel,
      bookstatusinput,
      id as string,
      RETURNING_COLUMNS_BOOK_STATUS
    );
    return returnOk(res, { data: bookstatus?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller delete bookstatus
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const deleteBookStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  try {
    /** validate bookstatusid */
    const bookstatusexist = await findByIdRepo<MBookStatusProps>(
      BookStatusModel,
      MODEL_BOOK_STATUS,
      id as string
    );
    if (!bookstatusexist) {
      return returnError(req, res, {
        table: MODEL_BOOK_STATUS,
      });
    }
    const bookstatus = await deleteRepo<MBookStatusProps>(
      BookStatusModel,
      id as string,
      RETURNING_COLUMNS_BOOK_STATUS
    );
    return returnOk(res, { data: bookstatus });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

export default {
  searchBookStatus,
  createBookStatus,
  updateBookStatus,
  deleteBookStatus,
};
