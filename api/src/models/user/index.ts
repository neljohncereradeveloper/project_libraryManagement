import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { MODEL_USER } from "../../constants";
import AccountModel from "../account";

@Entity(MODEL_USER)
class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  accountid: string;

  @Column({ type: "text", unique: true })
  idnumber: string;

  @Column({ type: "text" })
  firstname: string;

  @Column({ type: "text" })
  middlename: string;

  @Column({ type: "text" })
  lastname: string;

  @Column("smallint", { default: 0 })
  is_deleted: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @OneToOne(() => AccountModel)
  @JoinColumn({ name: "accountid" }) // The side you set @JoinColumn on, that side's table will contain a "relation id" and foreign keys to target entity table.
  account: AccountModel;
}

export default UserModel;
