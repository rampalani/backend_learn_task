import express from "express";
import {
  getAllItems,
  getItemById,
  addItem,
  deleteItem,
} from "../controllers/itemControl";

const router = express.Router();

// Routes for item operations
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/", addItem);
router.delete("/:id", deleteItem);

export default router;
