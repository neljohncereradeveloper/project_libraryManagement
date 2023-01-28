import { MODEL_BOOKS_CATEGORIES } from "./../../constants/index";
import {
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import BookModel from "../book";
import BookCategoryModel from "../book-category";

@Entity(MODEL_BOOKS_CATEGORIES)
class Books_CategoriesModel extends BaseEntity {
  @PrimaryColumn()
  bookid: number;

  @PrimaryColumn()
  categoryid: number;

  @ManyToOne(() => BookCategoryModel, (book) => book.categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "categoryid" })
  category: Promise<BookCategoryModel>;

  @ManyToOne(() => BookModel, (book) => book.categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "bookid" })
  book: Promise<BookModel>;
}

export default Books_CategoriesModel;
