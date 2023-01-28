import { Request, Response, NextFunction } from "express";
import { IBookAuthorProps } from "../../../types/models";

const transformCreateInput = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { author }: IBookAuthorProps = req.body;

  let bookauthorinput = { author } as IBookAuthorProps;

  req.body = { bookauthorinput };

  return next();
};

const transformUpdateInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { author }: IBookAuthorProps = req.body;

  let bookauthorinput = { author } as IBookAuthorProps;

  req.body = { bookauthorinput };

  return next();
};
export default {
  transformCreateInput,
  transformUpdateInput,
};
