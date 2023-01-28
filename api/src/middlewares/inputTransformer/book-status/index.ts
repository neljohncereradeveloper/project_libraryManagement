import { Request, Response, NextFunction } from "express";
import { IBookStatusProps } from "../../../types/models";

const transformCreateInput = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { status }: IBookStatusProps = req.body;

  let bookstatusinput = { status } as IBookStatusProps;

  req.body = { bookstatusinput };

  return next();
};

const transformUpdateInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { status }: IBookStatusProps = req.body;

  let bookstatusinput = { status } as IBookStatusProps;

  req.body = { bookstatusinput };

  return next();
};
export default {
  transformCreateInput,
  transformUpdateInput,
};
