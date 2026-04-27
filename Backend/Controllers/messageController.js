const db = require("../db");

exports.getMessages = (req, res) => {
  const { staff_id } = req.query;

  db.query(
    `SELECT * FROM message_log 
     WHERE Staff_ID=? 
     ORDER BY Created_At DESC`,
    [staff_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};