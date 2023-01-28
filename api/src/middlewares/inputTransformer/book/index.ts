import { Request, Response, NextFunction } from "express";
import { IBookProps } from "../../../types/models";

const transformCreateInput = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const {
    bookid,
    title,
    accountnumber,
    isbnnumber,
    sectionid,
    dewydecimal,
    publisher,
    placeofpublication,
    copyrightyear,
    statusid,
    booktypeid,
  }: IBookProps = req.body;

  let bookinput = {
    bookid,
    title,
    accountnumber,
    isbnnumber,
    sectionid,
    dewydecimal,
    publisher,
    placeofpublication,
    copyrightyear,
    statusid,
    booktypeid,
  } as IBookProps;

  req.body = { bookinput };

  return next();
};

const transformUpdateInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const {
    bookid,
    title,
    accountnumber,
    isbnnumber,
    sectionid,
    dewydecimal,
    publisher,
    placeofpublication,
    copyrightyear,
    statusid,
    booktypeid,
  }: IBookProps = req.body;

  let bookinput = {
    bookid,
    title,
    accountnumber,
    isbnnumber,
    sectionid,
    dewydecimal,
    publisher,
    placeofpublication,
    copyrightyear,
    statusid,
    booktypeid,
  } as IBookProps;

  req.body = { bookinput };

  return next();
};
export default {
  transformCreateInput,
  transformUpdateInput,
};
