const db = require("../db");

exports.getCategories = (req, res) => {
  db.query("SELECT * FROM category", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};