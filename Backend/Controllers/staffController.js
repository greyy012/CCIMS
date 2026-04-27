const db = require("../db");

exports.getMyComplaints = (req, res) => {
  const { staff_id, role } = req.query;

  if (role === "hod" || role === "coordinator") {
    return db.query(`SELECT * FROM complaints`, (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  }

  db.query(
    `SELECT * FROM complaints WHERE Staff_ID=?`,
    [staff_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
exports.getAllStaff = (req, res) => {
  db.query("SELECT Staff_ID, Name FROM staff_", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};