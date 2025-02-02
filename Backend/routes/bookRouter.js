import express from "express";
import { addBook, getBooksByUser, getBooks, updateBook, deleteBook } from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
const router = express.Router();


router.post("/add", authMiddleware, upload.single("image"), addBook);
router.get("/", getBooks);
router.get("/:id", authMiddleware, getBooksByUser);
router.put("/:id", authMiddleware, upload.single("image"), updateBook);
router.delete("/:id", authMiddleware, deleteBook);

export default router;