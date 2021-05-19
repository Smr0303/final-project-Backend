const client = require("../config/db");

exports.addNote = (req, res) => {
  const { heading, content } = req.body;
  if ((heading.length && content.length) === 0) {
    res.status(400).json({
      message: "Not completed",
    });
  } else {
    client
      .query(
        `INSERT INTO notes( email, heading, content)VAlUES('${req.email}','${heading}','${content}');`
      )
      .then((data) => {
        res.status(200).json({
          message: "Note added successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: "Database error occured",
        });
      });
  }
};

exports.getallNote = (req, res) => {
  client
    .query(`SELECT * FROM notes where email='${req.email}';`)
    .then((data) => {
      const noteData = data.rows;
      const filteredData = noteData.map((note) => {
        return {
          noteId: note.noteid,
          heading: note.heading,
          content: note.content,
        };
      });

      res.status(200).json({
        message: "Success",
        data: filteredData,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Internal server error",
      });
    });
};

exports.updateNote = (req, res) => {
  const noteId = req.params.noteId;
  const { heading, content } = req.body;
  client
    .query(
      `UPDATE notes SET heading='${heading}' , content='${content}' WHERE noteId='${noteId}'`
    )
    .then((data) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "DB error occured",
      });
    });
};
exports.deleteNote = (req, res) => {
  const noteId = req.params.noteId;
  client
    .query(`DELETE FROM notes where noteId='${noteId}';`)
    .then((data) => {
      res.status(200).json({
        message: "Deleted succesfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "error occured try again",
      });
    });
};
