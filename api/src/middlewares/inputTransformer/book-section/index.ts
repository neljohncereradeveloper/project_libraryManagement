import { Request, Response, NextFunction } from "express";
import { IBookSectionProps } from "../../../types/models";

const transformCreateInput = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { section }: IBookSectionProps = req.body;

  let booksectioninput = { section } as IBookSectionProps;

  req.body = { booksectioninput };

  return next();
};

const transformUpdateInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { section }: IBookSectionProps = req.body;

  let booksectioninput = { section } as IBookSectionProps;

  req.body = { booksectioninput };

  return next();
};
export default {
  transformCreateInput,
  transformUpdateInput,
};
