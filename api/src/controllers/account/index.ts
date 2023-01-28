import { IAccountProps, MAccountProps } from "./../../types/models";
import {
  MODEL_ACCOUNT,
  COLUMNS_ACCOUNT,
  RETURNING_COLUMNS_ACCOUNT,
  MODEL_ROLE,
} from "./../../constants";
import { Request, Response } from "express";
import { getPaginationData, returnError, returnOk } from "../../helper";
import { AccountModel } from "../../models";
import { searchRepo, updateRepo } from "../../repository";
import findByIdRepo from "../../repository/findById";
// import findByIdRepo from "../../repository/findById";

/**
 * Controller search accounts
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const searchAccounts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { text } = req.query;
  try {
    const page: number = parseInt(req.query.page as any) || 1;
    const take: number = parseInt(req.query.limit as any) || 5;
    const { count, result } = await searchRepo<MAccountProps>(
      AccountModel,
      MODEL_ACCOUNT,
      COLUMNS_ACCOUNT,
      {
        innerJoin: [{ refModel: "account.role", model: MODEL_ROLE }],
        where: {
          con: "account.username ILIKE :text",
          value: { text: `%${text}%` },
        },
        whereAnd: [
          {
            con: "account.is_deleted = :value",
            value: { value: 0 },
          },
        ],
        skip: ((page as number) - 1) * take,
        take,
        orderBy: { value: "account.username", condition: "ASC" },
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
    return returnOk(res, { data: null });
  } catch (error) {
    return returnError(req, res, { error });
  }
};
/**
 * Controller update account
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.query;
  const { accountinput } = req.body;
  try {
    /** validate accountid */
    const accountexist = await findByIdRepo<MAccountProps>(
      AccountModel,
      MODEL_ACCOUNT,
      id as string
    );
    if (!accountexist) {
      return returnError(req, res, {
        table: MODEL_ACCOUNT,
      });
    }
    /** update account */
    const account = await updateRepo<MAccountProps, IAccountProps>(
      AccountModel,
      accountinput,
      id as string,
      RETURNING_COLUMNS_ACCOUNT
    );
    return returnOk(res, { data: account?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

export default { searchAccounts, updateAccount };
