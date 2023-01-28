import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MODEL_ROLE } from "../../constants";
import AccountModel from "../account";

@Entity(MODEL_ROLE)
class RoleModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  name: string;

  @Column("smallint", { default: 0 })
  is_deleted: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @OneToMany(() => AccountModel, (account) => account.role)
  accounts: AccountModel[];
}

export default RoleModel;
