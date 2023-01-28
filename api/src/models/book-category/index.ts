import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MODEL_BOOK_CATEGORY } from "../../constants";
import Books_CategoriesModel from "../books-categories";

@Entity(MODEL_BOOK_CATEGORY)
class BookCategoryModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  category: string;

  @Column("smallint", { default: 0 })
  is_deleted: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @OneToMany(() => Books_CategoriesModel, (category) => category.book)
  categories: Promise<Books_CategoriesModel[]>;
}

export default BookCategoryModel;
