import { EntityTarget, UpdateResult } from "typeorm";
import { datasource } from "../../db";

/**
 *
 * @param entity Entity model
 * @param id primary key
 * @param returningColumns Columns to be returned after inserted
 * @returns `Promise<UpdateResult>`
 */
const deleteRepo = async <T>(
  entity: EntityTarget<T>,
  id: string,
  returningColumns: string
): Promise<UpdateResult> => {
  const result = await datasource
    .createQueryBuilder()
    .update(entity)
    .set({ is_deleted: 1 } as any)
    .where("id = :id", { id })
    .returning(returningColumns)
    .execute();

  return result.raw[0];
};

export default deleteRepo;
