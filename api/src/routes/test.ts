import express from "express";
import testController from "../controllers/test";

/** user main routes */
const router = express.Router();
router.route("/").get(testController.testCalculatePrice);

export default router;
