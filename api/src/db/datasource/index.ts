import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities:
    process.env.NODE_ENV === "development"
      ? ["src/models/**/*.ts"]
      : ["dist/models/**/*.js"],
  synchronize: true,
  logging: false,
});

export default datasource;
//
