import { EntityTarget, InsertResult } from "typeorm";
import { datasource } from "../../db";

/**
 *
 * @param entity Entity model
 * @param values Array of values
 * @param returningColumns Columns to be returned after inserted
 * @returns `Promise<InsertResult>`
 */
const createRepo = async <T, I>(
  entity: EntityTarget<T>,
  values: Array<I>,
  returningColumns: string
): Promise<InsertResult> => {
  const result: InsertResult = await datasource
    .createQueryBuilder()
    .insert()
    .into(entity)
    .values(values)
    .returning(returningColumns)
    .execute();

  return result;
};

export default createRepo;
