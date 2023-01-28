import { Request, Response, NextFunction } from "express";
import { IBookCategoryProps } from "../../../types/models";

const transformCreateInput = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { category }: IBookCategoryProps = req.body;

  let bookcategoryinput = { category } as IBookCategoryProps;

  req.body = { bookcategoryinput };

  return next();
};

const transformUpdateInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { category }: IBookCategoryProps = req.body;

  let bookcategoryinput = { category } as IBookCategoryProps;

  req.body = { bookcategoryinput };

  return next();
};
export default {
  transformCreateInput,
  transformUpdateInput,
};
