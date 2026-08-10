const db = require("../db");

exports.getDashboard = (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM complaints) AS total_complaints,
      (SELECT COUNT(*) FROM complaints WHERE Status='Pending') AS pending,
      (SELECT COUNT(*) FROM complaints WHERE Status='In Progress') AS in_progress,
      (SELECT COUNT(*) FROM complaints WHERE Status='Resolved') AS resolved,
      (SELECT COUNT(*) FROM complaints WHERE Status='Withdrawn') AS withdrawn,
      (SELECT COUNT(*) FROM students) AS total_students,
      (SELECT COUNT(*) FROM staff_) AS total_staff,
      (SELECT COUNT(*) FROM category) AS total_categories,
      (SELECT COUNT(*) FROM student_feedback) AS total_feedback,
      (SELECT COUNT(*) FROM announcements) AS total_announcements
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(result[0]);
  });
};

exports.getCategoryStats = (req, res) => {
  db.query(
    `SELECT cat.Name AS Category_Name, COUNT(c.Complaint_ID) AS count
     FROM category cat
     LEFT JOIN complaints c ON cat.Category_ID = c.Category_ID
     GROUP BY cat.Category_ID, cat.Name
     ORDER BY count DESC`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.getStatusStats = (req, res) => {
  db.query(
    `SELECT Status, COUNT(*) AS count FROM complaints GROUP BY Status`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// ——— Staff ———
exports.getStaff = (req, res) => {
  db.query(
    "SELECT Staff_ID, Name, Role, Password FROM staff_ ORDER BY Staff_ID",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result.map((r) => ({ ...r, Password: undefined })));
    }
  );
};

exports.addStaff = (req, res) => {
  const { staff_id, name, role, password } = req.body;
  if (!staff_id || !name || !password) {
    return res.status(400).json({ message: "Staff ID, name and password required" });
  }
  db.query(
    "INSERT INTO staff_ (Staff_ID, Name, Role, Password) VALUES (?, ?, ?, ?)",
    [staff_id, name, role || "", password],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Staff ID already exists" });
        }
        return res.status(500).json(err);
      }
      res.json({ message: "Staff added successfully" });
    }
  );
};

exports.updateStaff = (req, res) => {
  const { staff_id, name, role, password } = req.body;
  if (!staff_id) return res.status(400).json({ message: "Staff ID required" });

  const fields = [];
  const values = [];
  if (name) { fields.push("Name=?"); values.push(name); }
  if (role !== undefined) { fields.push("Role=?"); values.push(role); }
  if (password) { fields.push("Password=?"); values.push(password); }
  if (!fields.length) return res.status(400).json({ message: "Nothing to update" });

  values.push(staff_id);
  db.query(
    `UPDATE staff_ SET ${fields.join(", ")} WHERE Staff_ID=?`,
    values,
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json({ message: "Staff not found" });
      res.json({ message: "Staff updated" });
    }
  );
};

exports.deleteStaff = (req, res) => {
  const { staff_id } = req.body;
  db.query("DELETE FROM staff_ WHERE Staff_ID=?", [staff_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Staff not found" });
    res.json({ message: "Staff removed" });
  });
};

// ——— Categories ———
exports.getCategories = (req, res) => {
  db.query("SELECT * FROM category ORDER BY Category_ID", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addCategory = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Category name required" });
  db.query("INSERT INTO category (Name) VALUES (?)", [name], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category added" });
  });
};

exports.updateCategory = (req, res) => {
  const { category_id, name } = req.body;
  db.query(
    "UPDATE category SET Name=? WHERE Category_ID=?",
    [name, category_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Category updated" });
    }
  );
};

exports.deleteCategory = (req, res) => {
  const { category_id } = req.body;
  db.query("DELETE FROM category WHERE Category_ID=?", [category_id], (err) => {
    if (err) {
      if (err.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(400).json({ message: "Category is used by complaints" });
      }
      return res.status(500).json(err);
    }
    res.json({ message: "Category deleted" });
  });
};

// ——— Students ———
exports.getStudents = (req, res) => {
  db.query(
    "SELECT PRN_ID, Name, Email, course, Year FROM students ORDER BY PRN_ID",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.addStudent = (req, res) => {
  const { prn_id, name, email, password, course, year } = req.body;
  if (!prn_id || !name || !password) {
    return res.status(400).json({ message: "PRN, name and password required" });
  }
  db.query(
    "INSERT INTO students (PRN_ID, Name, Email, Password, course, Year) VALUES (?, ?, ?, ?, ?, ?)",
    [prn_id, name, email || "", password, course || "", year || null],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "PRN already exists" });
        }
        return res.status(500).json(err);
      }
      res.json({ message: "Student added" });
    }
  );
};

exports.deleteStudent = (req, res) => {
  const { prn_id } = req.body;
  db.query("DELETE FROM students WHERE PRN_ID=?", [prn_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student removed" });
  });
};

// ——— Announcements ———
exports.getAnnouncements = (req, res) => {
  db.query(
    "SELECT * FROM announcements ORDER BY Created_At DESC LIMIT 20",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.addAnnouncement = (req, res) => {
  const { title, message, created_by } = req.body;
  if (!title || !message) {
    return res.status(400).json({ message: "Title and message required" });
  }
  db.query(
    "INSERT INTO announcements (Title, Message, Created_By) VALUES (?, ?, ?)",
    [title, message, created_by || "Admin"],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Announcement published" });
    }
  );
};

exports.deleteAnnouncement = (req, res) => {
  const { announcement_id } = req.body;
  db.query(
    "DELETE FROM announcements WHERE Announcement_ID=?",
    [announcement_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Announcement removed" });
    }
  );
};

exports.getAllComplaints = (req, res) => {
  db.query(
    `SELECT c.*, cat.Name AS Category_Name, s.Name AS Student_Name
     FROM complaints c
     JOIN category cat ON c.Category_ID = cat.Category_ID
     JOIN students s ON c.PRN_ID = s.PRN_ID
     ORDER BY c.Complaint_ID DESC`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
