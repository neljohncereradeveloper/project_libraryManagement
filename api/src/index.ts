import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import express from "express";
import session from "express-session";
// import compression from "compression";
// import helmet from "helmet";
import { dbconnect } from "./db";
import { logger } from "./utils";
import {
  accountRoutes,
  bookAuthorRoutes,
  bookCategoryRoutes,
  bookRoutes,
  bookSectionRoutes,
  bookStatusRoutes,
  bookTypeRoutes,
  roleRoutes,
  userRoutes,
} from "./routes";
import testRoutes from "./routes/test";
import { IS_PROD, PORT } from "./constants";

const main = async () => {
  const app = express();
  /** connect postgres */
  await dbconnect();
  /* middelwares */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  // app.use(helmet());
  // app.use(compression());
  /** session */
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: IS_PROD,
        maxAge: 28800, // 28800 secs is 8 hours
      },
    })
  );
  /** api routes  */
  app.use("/api/user", userRoutes);
  app.use("/api/account", accountRoutes);
  app.use("/api/role", roleRoutes);
  app.use("/api/booksection", bookSectionRoutes);
  app.use("/api/bookstatus", bookStatusRoutes);
  app.use("/api/booktype", bookTypeRoutes);
  app.use("/api/bookauthor", bookAuthorRoutes);
  app.use("/api/bookcategory", bookCategoryRoutes);
  app.use("/api/book", bookRoutes);
  app.use("/api/test", testRoutes);
  /** listens */
  app.listen(PORT, () =>
    logger.info(`Server started and running on http://localhost:${PORT}`)
  );
};
// server call
main().catch((err) => {
  logger.error("Main server error : ", err);
});
