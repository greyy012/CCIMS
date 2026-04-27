const db = require("../db");

// 📝 CREATE (Student)
exports.createComplaint = (req, res) => {
  const { description, category_id, prn_id } = req.body;

  db.query(
    `INSERT INTO complaints 
    (Description, PRN_ID, Category_ID, Date_Of_Complaint, Status)
    VALUES (?, ?, ?, CURDATE(), 'Pending')`,
    [description, prn_id, category_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Complaint submitted ✅" });
    }
  );
};

// 📊 STUDENT VIEW
exports.getStudentComplaints = (req, res) => {
  const { prn_id } = req.query;

  db.query(
    `SELECT c.*, s.Name AS Staff_Name, cat.Name AS Category_Name
     FROM complaints c
     LEFT JOIN staff_ s ON c.Staff_ID = s.Staff_ID
     JOIN category cat ON c.Category_ID = cat.Category_ID
     WHERE c.PRN_ID=?`,
    [prn_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// 📊 STAFF / HOD VIEW
exports.getComplaints = (req, res) => {
  let { staff_id, role } = req.query;

  role = role?.toLowerCase();

  console.log("GET COMPLAINTS:", role, staff_id);

  // ✅ HOD → ALL
  if (role === "hod") {
    return db.query("SELECT * FROM complaints", (err, result) => {
      if (err) {
        console.log("ERROR:", err);
        return res.status(500).json(err);
      }
      res.json(result);
    });
  }

  // ✅ COORDINATOR → SAFE FILTER
  if (role === "coordinator") {
    return db.query(
      "SELECT * FROM complaints WHERE Staff_ID IS NULL OR Staff_ID = ''",
      (err, result) => {
        if (err) {
          console.log("ERROR:", err);
          return res.status(500).json(err);
        }
        res.json(result);
      }
    );
  }

  // ✅ STAFF
  db.query(
    "SELECT * FROM complaints WHERE Staff_ID=?",
    [staff_id],
    (err, result) => {
      if (err) {
        console.log("ERROR:", err);
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
};


// 🔄 ASSIGN (Coordinator only)
exports.assignComplaint = (req, res) => {
  const {
    complaint_id,
    staff_id,
    staff_name,
    role,
    assigned_by,
    assigned_by_name
  } = req.body;

  // ✅ ROLE CHECK (PUT HERE)
  if (role?.toLowerCase() !== "coordinator") {
    return res.status(403).json({ message: "Only coordinator can assign ❌" });
  }

  db.query(
    `UPDATE complaints 
     SET Staff_ID=?, 
         Staff_Name=?, 
         Assigned_By=?, 
         Assigned_By_Name=?, 
         Status='In Progress'
     WHERE Complaint_ID=?`,
    [staff_id, staff_name, assigned_by, assigned_by_name, complaint_id],
    (err) => {
      if (err) {
        console.log("ASSIGN ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Assigned successfully ✅" });
    }
  );
};

// 🔄 UPDATE STATUS
exports.updateStatus = (req, res) => {
  const { complaint_id, status, role } = req.body;

  if (role !== "resolver" && role !== "coordinator") {
    return res.status(403).json({ message: "Not allowed ❌" });
  }

  db.query(
    `UPDATE complaints SET Status=? WHERE Complaint_ID=?`,
    [status, complaint_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated ✅" });
    }
  );
};

// 📜 HISTORY
exports.getHistory = (req, res) => {
  let { staff_id, role } = req.query;

  role = role?.toLowerCase();

  console.log("GET HISTORY:", role, staff_id);

  let query = "";
  let params = [];

  if (role === "hod" || role === "coordinator") {
    query = "SELECT * FROM complaints ORDER BY Complaint_ID DESC";
  } else {
    query = "SELECT * FROM complaints WHERE Staff_ID=?";
    params = [staff_id];
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.log("HISTORY ERROR:", err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
};