import { EntityTarget } from "typeorm";
import { datasource } from "../../db";

type InnerJoinProps = {
  refModel: string;
  model: string;
};
type ConditionProps = {
  con: string;
  value: object;
};

type Props = {
  tableColumns?: Array<string>;
  innerJoin?: Array<InnerJoinProps>;
  where: ConditionProps;
  whereAnd?: Array<ConditionProps>;
  whereOr?: Array<ConditionProps>;
};
/**
 *
 * @param entity Entity model
 * @param model name
 * @param param3  [`tableColumns` ,`innerJoin`, `where`, `whereAnd`, `whereOr`] optional parameters
 * @returns `Promise<T | null>`
 */
const findOneRepo = async <T>(
  entity: EntityTarget<T>,
  model: string,
  { tableColumns, innerJoin, where, whereAnd, whereOr }: Props
): Promise<{ result: T | null }> => {
  let query = datasource.getRepository(entity).createQueryBuilder(model);
  // if innerjoin
  if (innerJoin) {
    innerJoin.map((data) => {
      query = query.innerJoin(data.refModel, data.model);
    });
  }
  // if has table columns
  if (tableColumns) {
    query = query.select(tableColumns);
  }

  // if where
  if (where) {
    query.where(where.con, where.value);
  }
  // if andWhere
  if (whereAnd) {
    whereAnd.map((data) => {
      query.andWhere(data.con, data.value);
    });
  }
  // if orWhere
  if (whereOr) {
    whereOr.map((data) => {
      query.orWhere(data.con, data.value);
    });
  }
  query = query.limit(1);
  const result = await query.getOne();

  return { result };
};

export default findOneRepo;
