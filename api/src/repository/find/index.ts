import { EntityTarget } from "typeorm";
import { datasource } from "../../db";

/**
 *
 * @param entity Entity model
 * @param model name
 * @param tableColumns array of columns
 * @returns `Promise<T[]>`
 */
const findRepo = async <T>(
  entity: EntityTarget<T>,
  model: string,
  tableColumns: Array<string>
): Promise<T[]> => {
  const result = await datasource
    .getRepository(entity)
    .createQueryBuilder(model)
    .select(tableColumns)
    .getMany();

  return result;
};

export default findRepo;
