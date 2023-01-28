import { Request, Response, NextFunction } from "express";
import { IAccountProps, IUserProps } from "../../../types/models";
import { hashPassword } from "../../../utils";

const transformCreateInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    idnumber,
    firstname,
    middlename,
    lastname,
    username,
    roleid,
  }: IUserProps & IAccountProps = req.body;

  let userinput = {
    idnumber,
    firstname,
    middlename,
    lastname,
  } as IUserProps;
  let accountinput = {
    roleid,
    username,
    password: await hashPassword(req, res, "password"),
  };
  req.body = { userinput, accountinput };

  return next();
};

const transformUpdateInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { idnumber, firstname, middlename, lastname }: IUserProps = req.body;

  let userinput = {
    idnumber,
    firstname,
    middlename,
    lastname,
  } as IUserProps;

  req.body = { userinput };

  return next();
};
export default {
  transformCreateInput,
  transformUpdateInput,
};
