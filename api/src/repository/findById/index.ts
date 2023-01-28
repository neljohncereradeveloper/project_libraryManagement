import { EntityTarget } from "typeorm";
import { datasource } from "../../db";

/**
 *
 * @param entity Entity model
 * @param model name
 * @param value value
 * @returns `Promise<T[]>`
 */
const findByIdRepo = async <T>(
  entity: EntityTarget<T>,
  model: string,
  value: string
): Promise<T | null> => {
  const result = await datasource
    .getRepository(entity)
    .createQueryBuilder(model)
    .where(`${model}.id = :value`, { value })
    .getOne();

  return result;
};

export default findByIdRepo;