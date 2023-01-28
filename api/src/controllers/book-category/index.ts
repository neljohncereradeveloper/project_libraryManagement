import { Request, Response } from "express";
import { returnError, returnOk, getPaginationData } from "../../helper";
import {
  createRepo,
  deleteRepo,
  searchRepo,
  updateRepo,
} from "../../repository";
import { BookCategoryModel } from "../../models";
import { IBookCategoryProps, MBookCategoryProps } from "./../../types/models";
import {
  MODEL_BOOK_CATEGORY,
  RETURNING_COLUMNS_BOOK_CATEGORY,
  COLUMNS_BOOK_CATEGORY,
} from "../../constants";
import findByIdRepo from "../../repository/findById";

/**
 * Controller search bookcategory
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */

const searchBookCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { text } = req.query;
  try {
    const page: number = parseInt(req.query.page as any) || 1;
    const take: number = parseInt(req.query.limit as any) || 5;
    const { count, result } = await searchRepo<MBookCategoryProps>(
      BookCategoryModel,
      MODEL_BOOK_CATEGORY,
      COLUMNS_BOOK_CATEGORY,
      {
        where: {
          con: "bookcategory.category ILIKE :text",
          value: { text: `%${text}%` },
        },
        whereAnd: [
          {
            con: "bookcategory.is_deleted = :value",
            value: { value: 0 },
          },
        ],
        skip: ((page as number) - 1) * take,
        take,
        orderBy: { value: "bookcategory.category", condition: "ASC" },
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
 * Controller create bookcategory
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const createBookCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { bookcategoryinput } = req.body;

  try {
    const bookcategory = await createRepo<
      MBookCategoryProps,
      IBookCategoryProps
    >(
      BookCategoryModel,
      [{ ...bookcategoryinput }],
      RETURNING_COLUMNS_BOOK_CATEGORY
    );

    return returnOk(res, { data: bookcategory?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller update bookcategory
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateBookCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  const { bookcategoryinput } = req.body;
  try {
    /** validate bookcategoryid */
    const bookcategoryexist = await findByIdRepo<MBookCategoryProps>(
      BookCategoryModel,
      MODEL_BOOK_CATEGORY,
      id as string
    );
    if (!bookcategoryexist) {
      return returnError(req, res, {
        table: MODEL_BOOK_CATEGORY,
      });
    }
    /** update book category */
    const bookcategory = await updateRepo<
      MBookCategoryProps,
      IBookCategoryProps
    >(
      BookCategoryModel,
      bookcategoryinput,
      id as string,
      RETURNING_COLUMNS_BOOK_CATEGORY
    );
    return returnOk(res, { data: bookcategory?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller delete bookcategory
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const deleteBookCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  try {
    /** validate bookcategoryid */
    const bookcategoryexist = await findByIdRepo<MBookCategoryProps>(
      BookCategoryModel,
      MODEL_BOOK_CATEGORY,
      id as string
    );
    if (!bookcategoryexist) {
      return returnError(req, res, {
        table: MODEL_BOOK_CATEGORY,
      });
    }
    /** delete book category */
    const bookcategory = await deleteRepo<MBookCategoryProps>(
      BookCategoryModel,
      id as string,
      RETURNING_COLUMNS_BOOK_CATEGORY
    );
    return returnOk(res, { data: bookcategory });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

export default {
  searchBookCategory,
  createBookCategory,
  updateBookCategory,
  deleteBookCategory,
};
