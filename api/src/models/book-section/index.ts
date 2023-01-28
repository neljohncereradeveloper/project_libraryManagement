import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MODEL_BOOK_SECTION } from "../../constants";
import BookModel from "../book";

@Entity(MODEL_BOOK_SECTION)
class BookSectionModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  section: string;

  @Column("smallint", { default: 0 })
  is_deleted: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @OneToMany(() => BookModel, (book) => book.booksection)
  books: BookModel[];
}
export default BookSectionModel;
