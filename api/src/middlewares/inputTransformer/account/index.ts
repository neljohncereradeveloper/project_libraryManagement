import { Request, Response, NextFunction } from "express";
import { IAccountProps } from "../../../types/models";

const transformUpdateInput = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { username, roleid }: IAccountProps = req.body;

  let accountinput = {
    username,
    roleid,
  };
  req.body = { accountinput };

  return next();
};

export default {
  transformUpdateInput,
};
