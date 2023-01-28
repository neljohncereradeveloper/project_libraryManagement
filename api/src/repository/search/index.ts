import { EntityTarget } from "typeorm";
import { datasource } from "../../db";

type LeftJoinProps = {
  refModel: string;
  model: string;
};
type ConditionProps = {
  con: string;
  value: object;
};
type Props = {
  innerJoin?: Array<LeftJoinProps>;
  where?: ConditionProps;
  whereAnd?: Array<ConditionProps>;
  whereOr?: Array<ConditionProps>;
  skip: number;
  take: number;
  orderBy: {
    value: string;
    condition: "ASC" | "DESC";
  };
};
/**
 *
 * @param entity Entity model
 * @param model name
 * @param tableColumns array of columns
 * @param param3  [`innerJoin`, `where`, `whereAnd`, `whereOr`] optional parameters
 * @returns `Promise<T[]>`
 */
const searchRepo = async <T>(
  entity: EntityTarget<T>,
  model: string,
  tableColumns: Array<string>,
  { innerJoin, where, whereAnd, whereOr, skip, take, orderBy }: Props
): Promise<{ result: T[]; count: number }> => {
  let query = datasource.getRepository(entity).createQueryBuilder(model);
  // innerjoin
  if (innerJoin) {
    innerJoin.map((data) => {
      query = query.innerJoin(data.refModel, data.model);
    });
  }
  query = query.select(tableColumns);
  // where
  if (where) {
    query.where(where.con, where.value);
  }
  // andWhere
  if (whereAnd) {
    whereAnd.map((data) => {
      query.andWhere(data.con, data.value);
    });
  }
  // orWhere
  if (whereOr) {
    whereOr.map((data) => {
      query.orWhere(data.con, data.value);
    });
  }

  query = query.skip(skip).take(take).orderBy(orderBy.value, orderBy.condition);

  const result = await query.getMany();
  const count = await query.getCount();

  return { result, count };
};

export default searchRepo;
