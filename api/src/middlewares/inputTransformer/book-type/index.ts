import { Request, Response, NextFunction } from "express";
import {  IBookTypeProps } from "../../../types/models";


const transformCreateInput = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const {type}: IBookTypeProps = req.body;

  let booktypeinput = {type} as IBookTypeProps;

  req.body = { booktypeinput };

  return next();
};

const transformUpdateInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const {type}: IBookTypeProps = req.body;

  let booktypeinput = {type} as IBookTypeProps;

  req.body = { booktypeinput };

  return next();
};
export default {
  transformCreateInput,
  transformUpdateInput,
};
