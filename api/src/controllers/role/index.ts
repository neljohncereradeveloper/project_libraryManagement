import { Request, Response } from "express";
import { returnError, returnOk, getPaginationData } from "../../helper";
import {
  createRepo,
  deleteRepo,
  searchRepo,
  updateRepo,
} from "../../repository";
import { RoleModel } from "../../models";
import { IRoleProps, MRoleProps } from "./../../types/models";
import {
  MODEL_ROLE,
  RETURNING_COLUMNS_ROLE,
  COLUMNS_ROLE,
} from "../../constants";
import findByIdRepo from "../../repository/findById";

/**
 * Controller search roles
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */

const searchRoles = async (req: Request, res: Response): Promise<Response> => {
  const { text } = req.query;
  try {
    const page: number = parseInt(req.query.page as any) || 1;
    const take: number = parseInt(req.query.limit as any) || 5;
    const { count, result } = await searchRepo<MRoleProps>(
      RoleModel,
      MODEL_ROLE,
      COLUMNS_ROLE,
      {
        where: {
          con: "role.name ILIKE :text",
          value: { text: `%${text}%` },
        },
        whereAnd: [
          {
            con: "role.is_deleted = :value",
            value: { value: 0 },
          },
        ],
        skip: ((page as number) - 1) * take,
        take,
        orderBy: { value: "role.name", condition: "ASC" },
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
 * Controller create role
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const createRole = async (req: Request, res: Response): Promise<Response> => {
  const { roleinput } = req.body;

  try {
    const role = await createRepo<MRoleProps, IRoleProps>(
      RoleModel,
      [{ ...roleinput }],
      RETURNING_COLUMNS_ROLE
    );

    return returnOk(res, { data: role?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller update role
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateRole = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.query;
  const { roleinput } = req.body;
  try {
    /** validate roleid */
    const roleexist = await findByIdRepo<MRoleProps>(
      RoleModel,
      MODEL_ROLE,
      id as string
    );
    if (!roleexist) {
      return returnError(req, res, {
        table: MODEL_ROLE,
      });
    }
    // update role
    const role = await updateRepo<MRoleProps, IRoleProps>(
      RoleModel,
      roleinput,
      id as string,
      RETURNING_COLUMNS_ROLE
    );
    return returnOk(res, { data: role?.raw[0] });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

/**
 * Controller delete role
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.query;
  try {
    /** validate roleid */
    const roleexist = await findByIdRepo<MRoleProps>(
      RoleModel,
      MODEL_ROLE,
      id as string
    );
    if (!roleexist) {
      return returnError(req, res, {
        table: MODEL_ROLE,
      });
    }
    // delete role
    const role = await deleteRepo<MRoleProps>(
      RoleModel,
      id as string,
      RETURNING_COLUMNS_ROLE
    );
    return returnOk(res, { data: role });
  } catch (error) {
    return returnError(req, res, { error });
  }
};

export default {
  searchRoles,
  createRole,
  updateRole,
  deleteRole,
};
