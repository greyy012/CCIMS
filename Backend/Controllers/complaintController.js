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
      `SELECT * FROM complaints 
       WHERE (Staff_ID IS NULL OR Staff_ID = '')
       AND Status NOT IN ('Withdrawn', 'Deleted')`,
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
exports.withdrawComplaint = (req, res) => {
  const { complaint_id, prn_id, role } = req.body;

  if (role?.toLowerCase() !== "student") {
    return res.status(403).json({ message: "Only students can withdraw complaints ❌" });
  }

  db.query(
    `SELECT * FROM complaints 
     WHERE Complaint_ID=? AND PRN_ID=?`,
    [complaint_id, prn_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Complaint not found ❌" });
      }

      const complaint = result[0];
      if (complaint.Status !== "Pending") {
        return res.status(400).json({
          message: "Only pending complaints can be withdrawn ❌",
        });
      }
      if (complaint.Staff_ID) {
        return res.status(400).json({
          message: "Cannot withdraw — complaint is already being processed ❌",
        });
      }

      db.query(
        `UPDATE complaints SET Status='Withdrawn' WHERE Complaint_ID=?`,
        [complaint_id],
        (updateErr) => {
          if (updateErr) return res.status(500).json(updateErr);
          res.json({ message: "Complaint withdrawn successfully ✅" });
        }
      );
    }
  );
};

exports.deleteComplaint = (req, res) => {
  const { complaint_id, role } = req.body;

  if (role?.toLowerCase() !== "coordinator") {
    return res.status(403).json({ message: "Only coordinator can delete invalid complaints ❌" });
  }

  db.query(
    `SELECT * FROM complaints WHERE Complaint_ID=?`,
    [complaint_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Complaint not found ❌" });
      }

      const complaint = result[0];
      if (complaint.Status === "Resolved") {
        return res.status(400).json({
          message: "Cannot delete a resolved complaint ❌",
        });
      }

      db.query(
        `DELETE FROM complaints WHERE Complaint_ID=?`,
        [complaint_id],
        (deleteErr) => {
          if (deleteErr) return res.status(500).json(deleteErr);
          res.json({ message: "Invalid complaint deleted ✅" });
        }
      );
    }
  );
};

exports.getComplaintStats = (req, res) => {
  const { role } = req.query;
  const r = role?.toLowerCase();
  if (r !== "hod" && r !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  db.query(
    `SELECT Status, COUNT(*) AS count FROM complaints GROUP BY Status`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.getCategoryStats = (req, res) => {
  const { role } = req.query;
  const r = role?.toLowerCase();
  if (r !== "hod" && r !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

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

exports.getStudentDashboard = (req, res) => {
  const { prn_id } = req.query;
  db.query(
    `SELECT
      COUNT(*) AS total,
      SUM(Status='Pending') AS pending,
      SUM(Status='In Progress') AS in_progress,
      SUM(Status='Resolved') AS resolved,
      SUM(Status='Withdrawn') AS withdrawn
     FROM complaints WHERE PRN_ID=?`,
    [prn_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
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