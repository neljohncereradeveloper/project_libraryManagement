import { Response } from "express";
type Props<T> = {
  data: T;
  info?: {
    count: number;
    totalPages: number;
    currentPage: number;
    nextPage: boolean;
    previousPage: boolean;
  };
};

const returnOk = <T>(res: Response, { data, info }: Props<T>): Response => {
  return res.status(200).json({
    info,
    data,
    error: false,
  });
};
export default returnOk;
