const db = require("../db");

exports.getDashboard = (req, res) => {
  db.query(
    `SELECT COUNT(*) total,
     SUM(Status='Pending') pending,
     SUM(Status='Resolved') resolved
     FROM complaints`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};