const db = require("../db");


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


exports.getComplaints = (req, res) => {
  let { staff_id, role } = req.query;

  role = (role || "").toLowerCase();

  console.log("ROLE:", role);


  if (role === "hod") {
    db.query("SELECT * FROM complaints", (err, result) => {
      if (err) {
        console.log("HOD ERROR:", err);
        return res.status(500).json(err);
      }
      return res.json(result);
    });
    return; // 🔥 VERY IMPORTANT
  }

 
  if (role === "coordinator") {
    db.query(
      "SELECT * FROM complaints WHERE Staff_ID IS NULL OR Staff_ID = ''",
      (err, result) => {
        if (err) {
          console.log("COORD ERROR:", err);
          return res.status(500).json(err);
        }
        return res.json(result);
      }
    );
    return; 
  }

  db.query(
    "SELECT * FROM complaints WHERE Staff_ID=?",
    [staff_id],
    (err, result) => {
      if (err) {
        console.log("STAFF ERROR:", err);
        return res.status(500).json(err);
      }
      return res.json(result);
    }
  );
};


// exports.assignComplaint = (req, res) => {
//   const {
//     complaint_id,
//     staff_id,
//     staff_name,
//     role,
//     assigned_by,
//     assigned_by_name
//   } = req.body;

//   if (role?.toLowerCase() !== "coordinator") {
//     return res.status(403).json({ message: "Only coordinator can assign ❌" });
//   }

  // db.query(
    // `UPDATE complaints 
    //  SET Staff_ID=?, 
    //      Staff_Name=?, 
    //      Assigned_By=?, 
    //      Assigned_By_Name=?, 
    //      Status='In Progress'
    //  WHERE Complaint_ID=?`,
    // [staff_id, staff_name, assigned_by, assigned_by_name, complaint_id],
//     db.query(
//   `UPDATE complaints 
//    SET Staff_ID=?, 
//        Staff_Name=?, 
//        Assigned_By=?, 
//        Assigned_By_Name=?, 
//        Assigned_Time = NOW(),   // ✅ ADD HERE
//        Status='In Progress'
//    WHERE Complaint_ID=?`,
//   [staff_id, staff_name, assigned_by, assigned_by_name, complaint_id],
//     (err) => {
//       if (err) {
//         console.log("ASSIGN ERROR:", err);
//         return res.status(500).json(err);
//       }

//       res.json({ message: "Assigned successfully " });
//     }
//   );
// };
exports.assignComplaint = (req, res) => {
  const {
    complaint_id,
    staff_id,
    staff_name,
    role,
    assigned_by,
    assigned_by_name
  } = req.body;

  if (role?.toLowerCase() !== "coordinator") {
    return res.status(403).json({ message: "Only coordinator can assign ❌" });
  }

  db.query(
    `UPDATE complaints 
     SET Staff_ID=?, 
         Staff_Name=?, 
         Assigned_By=?, 
         Assigned_By_Name=?, 
         Assigned_Time = NOW(),
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

exports.getAllStaff = (req, res) => {
  db.query(
    `SELECT Staff_ID, Name 
     FROM staff_ 
     WHERE LOWER(Role) NOT IN ('coordinator', 'hod')`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
// controllers/categoryController.js
exports.getCategories = (req, res) => {
  db.query("SELECT Category_ID, Name FROM category", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
// exports.updateStatus = (req, res) => {
//   const { complaint_id, status } = req.body;

//   db.query(
//     `UPDATE complaints SET Status=? WHERE Complaint_ID=?`,
//     [status, complaint_id],
//     (err) => {
//       if (err) {
//         console.log("STATUS ERROR:", err);
//         return res.status(500).json(err);
//       }

//       res.json({ message: "Status updated " });
//     }
//   );
// };
exports.updateStatus = (req, res) => {
  const { complaint_id, status } = req.body;

  let query = "";
  let params = [];

  if (status === "Resolved") {
    query = `
      UPDATE complaints 
      SET Status=?, Resolved_Time = NOW()
      WHERE Complaint_ID=?`;
    params = [status, complaint_id];
  } else {
    query = `
      UPDATE complaints 
      SET Status=? 
      WHERE Complaint_ID=?`;
    params = [status, complaint_id];
  }

  db.query(query, params, (err) => {
    if (err) {
      console.log("STATUS ERROR:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Status updated " });
  });
};
// exports.getHistory = (req, res) => {
//   let { staff_id, role } = req.query;
//   role = role?.toLowerCase();

//   let query = "";
//   let params = [];

//   if (role === "hod" || role === "coordinator") {
//     query = "SELECT * FROM complaints ORDER BY Complaint_ID DESC";
//   } else {
//     query = "SELECT * FROM complaints WHERE Staff_ID=?";
//     params = [staff_id];
//   }

//   db.query(query, params, (err, result) => {
//     if (err) {
//       console.log("HISTORY ERROR:", err);
//       return res.status(500).json(err);
//     }
//     res.json(result);
//   });
// };
exports.getHistory = (req, res) => {
  let { staff_id, role } = req.query;
  role = role?.toLowerCase();

  let query = `
    SELECT *,
    TIMESTAMPDIFF(HOUR, Assigned_Time, Resolved_Time) AS resolution_hours
    FROM complaints
  `;

  let params = [];

  if (role !== "hod" && role !== "coordinator") {
    query += " WHERE Staff_ID=?";
    params.push(staff_id);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.log("HISTORY ERROR:", err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
};
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
      if (err) {
        console.log("STUDENT ERROR:", err);
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
};