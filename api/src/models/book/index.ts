import { MODEL_BOOK } from "./../../constants/index";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import BookSectionModel from "../book-section";
import BookStatusModel from "../book-status";
import BookTypeModel from "../book-type";
import Books_AuthorsModel from "../books-authors";
import Books_CategoriesModel from "../books-categories";

@Entity(MODEL_BOOK)
class BookModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  bookid: string;

  @Column("text", {unique:true})
  title: string;

  @Column("text", { unique: true })
  accountnumber: string;

  @Column("text")
  isbnnumber: string;

  @Column("uuid")
  sectionid: string;

  @Column("integer")
  dewydecimal: number;

  @Column("text")
  publisher: string;

  @Column("text")
  placeofpublication: string;

  @Column("integer")
  copyrightyear: number;

  @Column("uuid")
  statusid: string;

  @Column("uuid")
  booktypeid: string;

  @Column("smallint", { default: 0 })
  is_deleted: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @ManyToOne(() => BookSectionModel, (section) => section.books)
  @JoinColumn({ name: "sectionid" })
  booksection: BookSectionModel;

  @ManyToOne(() => BookStatusModel, (status) => status.books)
  @JoinColumn({ name: "statusid" })
  bookstatus: BookStatusModel;

  @ManyToOne(() => BookTypeModel, (type) => type.books)
  @JoinColumn({ name: "booktypeid" })
  booktype: BookTypeModel;

  @OneToMany(() => Books_AuthorsModel, (books_authors) => books_authors.book)
  authors: Promise<Books_AuthorsModel[]>;

  @OneToMany(
    () => Books_CategoriesModel,
    (books_categories) => books_categories.book
  )
  categories: Promise<Books_CategoriesModel[]>;
}

export default BookModel;
