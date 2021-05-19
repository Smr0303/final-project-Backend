const express = require("express");
const { verifyToken } = require("../middleware/authmiddleware");
const {
  addNote,
  getallNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");
const router = express.Router();

router.post("/add", verifyToken, addNote);
router.get("/getallNote", verifyToken, getallNote);
router.put("/updateNote/:noteId", verifyToken, updateNote);
router.delete("/deleteNote/:noteId", verifyToken, deleteNote);

const notes = express();
module.exports = router;
