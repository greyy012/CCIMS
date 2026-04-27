const db = require("../db");

// ================= LOGIN =================
exports.login = (req, res) => {
  let { identifier, password, role } = req.body;

  // 🔥 clean input
  identifier = identifier?.toString().trim();
  password = password?.toString().trim();

  console.log("LOGIN DATA:", identifier, password, role);

  // ================= STUDENT =================
  if (role === "student") {
    db.query(
      "SELECT * FROM students WHERE PRN_ID=? AND Password=?",
      [Number(identifier), password],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }

        console.log("STUDENT RESULT:", result);

        if (!result || result.length === 0) {
          return res.status(401).json({
            error: "Invalid student credentials ❌",
          });
        }

        return res.json({
          user: {
            id: result[0].PRN_ID,
            name: result[0].Name,
            role: "student",
          },
        });
      }
    );
  }

  // ================= STAFF =================
  else if (role === "staff") {
    db.query(
      "SELECT * FROM staff_ WHERE Staff_ID=? AND Password=?",
      [Number(identifier), password],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }

        console.log("STAFF RESULT:", result);
console.log("LOGIN DATA:", identifier, password, role);
        if (!result || result.length === 0) {
          return res.status(401).json({
            error: "Invalid staff credentials ❌",
          });
        }

        return res.json({
          user: {
            id: result[0].Staff_ID,
            name: result[0].Name,
            role: "staff",
            staffRole: result[0].Role, // 🔥 important
          },
        });
      }
    );
  }

  // ================= INVALID ROLE =================
  else {
    return res.status(400).json({
      error: "Invalid role ❌",
    });
  }
};