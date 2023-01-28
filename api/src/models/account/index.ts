import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { MODEL_ACCOUNT } from "../../constants";
import RoleModel from "../role";

@Entity(MODEL_ACCOUNT)
class AccountModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  username: string;

  @Column("text")
  password: string;

  @Column("integer")
  roleid: number;

  @Column("smallint", { default: 0 })
  is_deleted: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @ManyToOne(() => RoleModel, (role) => role.accounts)
  @JoinColumn({ name: "roleid" })
  role: RoleModel;
}

export default AccountModel;
