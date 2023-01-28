import { MODEL_ROLE } from "./../../constants/index";
import {
  IAccountProps,
  IUserProps,
  MAccountProps,
  MUserProps,
} from "./../../types/models";
import { Request, Response } from "express";
import { returnError, returnOk, getPaginationData } from "../../helper";
import { AccountModel, UserModel } from "../../models";
import {
  findOneRepo,
  createRepo,
  updateRepo,
  searchRepo,
} from "../../repository";
import {
  RETURNING_COLUMNS_ACCOUNT,
  MODEL_ACCOUNT,
  MODEL_USER,
  RETURNING_COLUMNS_USER,
  COLUMNS_USER,
} from "../../constants";
import findByIdRepo from "../../repository/findById";

/**
 * Controller create user
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { userinput, accountinput } = req.body;
  let user;
  try {
    /** insert account */
    const account = await createRepo<MAccountProps, IAccountProps>(
      AccountModel,
      [accountinput],
      RETURNING_COLUMNS_ACCOUNT
    );
    if (account) {
      /** insert user */
      user = await createRepo<MUserProps, IUserProps>(
        UserModel,
        [{ ...userinput, accountid: account.raw[0].id }],
        RETURNING_COLUMNS_USER
      );
    }
    /** retrieve created user for react query purpose */
    const { result } = await findOneRepo<MUserProps>(UserModel, MODEL_USER, {
      tableColumns: COLUMNS_USER,
      innerJoin: [
        { refModel: "user.account", model: MODEL_ACCOUNT },
        { refModel: "account.role", model: MODEL_ROLE },
      ],
      where: {
        con: "user.id = :value",
        value: { value: user?.raw[0].id },
      },
    });
    return returnOk(res, { data: result });
  } catch (error) {
    return returnError(req, res, { error });
  }
};
/**
 * Controller update user
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.query;
  const { userinput } = req.body;
  try {
    /** validate userid */
    const userexist = await findByIdRepo<MUserProps>(
      UserModel,
      MODEL_USER,
      id as string
    );
    if (!userexist) {
      return returnError(req, res, {
        table: MODEL_USER,
      });
    }
    /** update user information */
    const user = await updateRepo<MUserProps, IUserProps>(
      UserModel,
      userinput,
      id as string,
      RETURNING_COLUMNS_USER
    );
    /** retrieve updated user for react query purpose */
    const { result } = await findOneRepo<MUserProps>(UserModel, MODEL_USER, {
      tableColumns: COLUMNS_USER,
      innerJoin: [
        { refModel: "user.account", model: MODEL_ACCOUNT },
        { refModel: "account.role", model: MODEL_ROLE },
      ],
      where: {
        con: "user.id = :value",
        value: { value: user?.raw[0].id },
      },
    });
    return returnOk(res, { data: result });
  } catch (error) {
    return returnError(req, res, { error });
  }
};
/**
 * Controller search users
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */

const searchUsers = async (req: Request, res: Response): Promise<Response> => {
  const { text } = req.query;
  try {
    const page: number = parseInt(req.query.page as any) || 1;
    const take: number = parseInt(req.query.limit as any) || 5;
    const { count, result } = await searchRepo<MUserProps>(
      UserModel,
      MODEL_USER,
      COLUMNS_USER,
      {
        innerJoin: [
          { refModel: "user.account", model: MODEL_ACCOUNT },
          { refModel: "account.role", model: MODEL_ROLE },
        ],
        where: {
          con: "user.firstname ILIKE :text",
          value: { text: `%${text}%` },
        },
        whereOr: [
          {
            con: "user.middlename ILIKE :text",
            value: { text: `%${text}%` },
          },
          {
            con: "user.lastname ILIKE :text",
            value: { text: `%${text}%` },
          },
        ],
        whereAnd: [
          {
            con: "user.is_deleted = :value",
            value: { value: 0 },
          },
        ],
        skip: ((page as number) - 1) * take,
        take,
        orderBy: { value: "user.firstname", condition: "ASC" },
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

export default {
  searchUsers,
  createUser,
  updateUser,
};
