import { MODEL_BOOK_STATUS } from "./../../constants/index";
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

@Entity(MODEL_BOOK_STATUS)
class BookStatusModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  status: string;

  @Column("smallint", { default: 0 })
  is_deleted: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @OneToMany(() => BookModel, (book) => book.bookstatus)
  books: BookModel[];
}
export default BookStatusModel;
