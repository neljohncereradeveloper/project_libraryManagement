/**
 * I - input
 * M - model
 */

/**
 * Role model props
 */
export type IRoleProps = {
  name: string;
};
export type MRoleProps = IRoleProps;

/**
 * ACCOUNT model props
 */
export type IAccountProps = {
  username: string;
  roleid: string;
};
export type MAccountProps = IAccountProps;

/**
 * USER model props
 */
export type IUserProps = {
  firstname: string;
  middlename: string;
  lastname: string;
  idnumber: string;
  accountid: string;
};
export type MUserProps = IUserProps;

/**
 * Book Section model props
 */
export type IBookSectionProps = {
  section: string;
};
export type MBookSectionProps = IBookSectionProps;
/**
 * Book Status model props
 */
export type IBookStatusProps = {
  status: string;
};
export type MBookStatusProps = IBookStatusProps;
/**
 * Book Type model props
 */
export type IBookTypeProps = {
  type: string;
};
export type MBookTypeProps = IBookTypeProps;
/**
 * Book Author model props
 */
export type IBookAuthorProps = {
  author: string;
};
export type MBookAuthorProps = IBookAuthorProps;
/**
 * Book Category model props
 */
export type IBookCategoryProps = {
  category: string;
};
export type MBookCategoryProps = IBookCategoryProps;

/**
 * Book model props
 */
export type IBookProps = {
  bookid: string;
  title: string;
  accountnumber: string;
  isbnnumber: string;
  sectionid: string;
  dewydecimal: number;
  publisher: string;
  placeofpublication: string;
  copyrightyear: number;
  statusid: string;
  booktypeid: string;
};
export type MBookProps = IBookProps;
