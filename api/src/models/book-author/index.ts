import { MODEL_BOOK_AUTHOR } from "./../../constants/index";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Books_AuthorsModel from "../books-authors";

@Entity(MODEL_BOOK_AUTHOR)
class BookAuthorModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  author: string;

  @Column("smallint", { default: 0 })
  is_deleted: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @OneToMany(() => Books_AuthorsModel, (author) => author.book)
  authors: Promise<Books_AuthorsModel[]>;
}
export default BookAuthorModel;
