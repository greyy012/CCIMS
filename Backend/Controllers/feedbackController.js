const db = require("../db");

exports.submitFeedback = (req, res) => {
  const { prn_id, complaint_id, rating, message } = req.body;

  if (!prn_id || !rating) {
    return res.status(400).json({ message: "Rating is required" });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  db.query(
    `INSERT INTO student_feedback (PRN_ID, Complaint_ID, Rating, Message) VALUES (?, ?, ?, ?)`,
    [prn_id, complaint_id || null, rating, message || ""],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not save feedback" });
      }
      res.json({ message: "Thank you for your feedback" });
    }
  );
};

exports.getMyFeedback = (req, res) => {
  const { prn_id } = req.query;
  db.query(
    `SELECT f.*, c.Description AS Complaint_Description
     FROM student_feedback f
     LEFT JOIN complaints c ON f.Complaint_ID = c.Complaint_ID
     WHERE f.PRN_ID=?
     ORDER BY f.Created_At DESC`,
    [prn_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.getAllFeedback = (req, res) => {
  db.query(
    `SELECT f.*, s.Name AS Student_Name, c.Description AS Complaint_Description
     FROM student_feedback f
     JOIN students s ON f.PRN_ID = s.PRN_ID
     LEFT JOIN complaints c ON f.Complaint_ID = c.Complaint_ID
     ORDER BY f.Created_At DESC`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
