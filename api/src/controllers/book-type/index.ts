import { Request, Response } from "express";
import { returnError, returnOk, getPaginationData } from "../../helper";
import {
  createRepo,
  deleteRepo,
  searchRepo,
  updateRepo,
} from "../../repository";
import { BookTypeModel } from "../../models";
import { IBookTypeProps, MBookTypeProps } from "./../../types/models";
import {
  MODEL_BOOK_TYPE,
  RETURNING_COLUMNS_BOOK_TYPE,
  COLUMNS_BOOK_TYPE,
} from "../../constants";
import findByIdRepo from "../../repository/findById";

/**
 * Controller search booktype
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */

const searchBookType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { text } = req.query;
  try {
    const page: number = parseInt(req.query.page as any) || 1;
    const take: number = parseInt(req.query.limit as any) || 5;
    const { count, result } = await searchRepo<MBookTypeProps>(
      BookTypeModel,
      MODEL_BOOK_TYPE,
      COLUMNS_BOOK_TYPE,
      {
        where: {
          con: "booktype.type ILIKE :text",
          value: { text: `%${text}%` },
        },
        whereAnd: [
          {
            con: "booktype.is_deleted = :value",
            value: { value: 0 },
          },
        ],
        skip: ((page as number) - 1) * take,
        take,
        orderBy: { value: "booktype.type", condition: "ASC" },
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
 * Controller create booktype
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const createBookType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { booktypeinput } = req.body;

  try {
    const booktype = await createRepo<MBookTypeProps, IBookTypeProps>(
      BookTypeModel,
      [{ ...booktypeinput }],
      RETURNING_COLUMNS_BOOK_TYPE
    );

    return returnOk(res, { data: booktype?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller update booktype
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateBookType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  const { booktypeinput } = req.body;
  try {
    /** validate booktypeid */
    const booktypeexist = await findByIdRepo<MBookTypeProps>(
      BookTypeModel,
      MODEL_BOOK_TYPE,
      id as string
    );
    if (!booktypeexist) {
      return returnError(req, res, {
        table: MODEL_BOOK_TYPE,
      });
    }
    const booktype = await updateRepo<MBookTypeProps, IBookTypeProps>(
      BookTypeModel,
      booktypeinput,
      id as string,
      RETURNING_COLUMNS_BOOK_TYPE
    );
    return returnOk(res, { data: booktype?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller delete booktype
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const deleteBookType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  try {
    /** validate booktypeid */
    const booktypeexist = await findByIdRepo<MBookTypeProps>(
      BookTypeModel,
      MODEL_BOOK_TYPE,
      id as string
    );
    if (!booktypeexist) {
      return returnError(req, res, {
        table: MODEL_BOOK_TYPE,
      });
    }
    /** delete book type */
    const booktype = await deleteRepo<MBookTypeProps>(
      BookTypeModel,
      id as string,
      RETURNING_COLUMNS_BOOK_TYPE
    );
    return returnOk(res, { data: booktype });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

export default {
  searchBookType,
  createBookType,
  updateBookType,
  deleteBookType,
};
