import { MODEL_BOOK_TYPE } from "./../../constants/index";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import BookModel from "../book";

@Entity(MODEL_BOOK_TYPE)
class BookTypeModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  type: string;

  @Column("smallint", { default: 0 })
  is_deleted: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @OneToMany(() => BookModel, (book) => book.booktype)
  books: BookModel[];
}
export default BookTypeModel;
