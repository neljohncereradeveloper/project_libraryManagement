import { Request, Response, NextFunction } from "express";
import { IRoleProps } from "../../../types/models";

const transformCreateInput = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { name }: IRoleProps = req.body;

  let roleinput = {
    name,
  } as IRoleProps;

  req.body = { roleinput };

  return next();
};

export default { transformCreateInput };
