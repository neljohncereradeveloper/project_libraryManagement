import { MODEL_BOOKS_AUTHORS } from "./../../constants/index";
import {
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import BookModel from "../book";
import BookAuthorModel from "../book-author";

@Entity(MODEL_BOOKS_AUTHORS)
class Books_AuthorsModel extends BaseEntity {
  @PrimaryColumn()
  bookid: number;

  @PrimaryColumn()
  authorid: number;

  @ManyToOne(() => BookAuthorModel, (book) => book.authors, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "authorid" })
  author: Promise<BookAuthorModel>;

  @ManyToOne(() => BookModel, (book) => book.authors, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "bookid" })
  book: Promise<BookModel>;
}

export default Books_AuthorsModel;
