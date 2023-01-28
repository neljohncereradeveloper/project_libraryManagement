import { EntityTarget, UpdateResult } from "typeorm";
import { datasource } from "../../db";

/**
 *
 * @param entity Entity model
 * @param values Array of values
 * @param id primary key
 * @param returningColumns Columns to be returned after inserted
 * @returns `Promise<InsertResult>`
 */
const updateRepo = async <T, I>(
  entity: EntityTarget<T>,
  values: I,
  id: string,
  returningColumns: string
): Promise<UpdateResult> => {
  const result = await datasource
    .createQueryBuilder()
    .update(entity)
    .set(values)
    .where("id = :id", { id })
    .returning(returningColumns)
    .execute();

  return result;
};

export default updateRepo;
