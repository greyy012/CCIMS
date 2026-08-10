require("dotenv").config();
const db = require("./db");

const queries = [
  `CREATE TABLE IF NOT EXISTS admin_users (
    Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Name VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS student_feedback (
    Feedback_ID INT AUTO_INCREMENT PRIMARY KEY,
    PRN_ID INT NOT NULL,
    Complaint_ID INT NULL,
    Rating INT NOT NULL,
    Message TEXT,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_feedback_prn (PRN_ID),
    INDEX idx_feedback_complaint (Complaint_ID)
  )`,
  `CREATE TABLE IF NOT EXISTS announcements (
    Announcement_ID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(200) NOT NULL,
    Message TEXT NOT NULL,
    Created_By VARCHAR(100),
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
];

function runQuery(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err) => {
      if (err && err.code !== "ER_TABLE_EXISTS_ERROR") return reject(err);
      resolve();
    });
  });
}

async function main() {
  try {
    for (const sql of queries) {
      await runQuery(sql);
    }

    const rows = await new Promise((resolve, reject) => {
      db.query(
        "SELECT Admin_ID FROM admin_users WHERE Username=? LIMIT 1",
        ["admin"],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });

    if (rows.length === 0) {
      await runQuery(
        `INSERT INTO admin_users (Username, Name, Password) VALUES ('admin', 'System Administrator', 'admin123')`
      );
      console.log("Default admin created: username admin / password admin123");
    } else {
      console.log("Database ready. Admin user exists.");
    }
    process.exit(0);
  } catch (err) {
    console.error("Setup failed:", err.message);
    process.exit(1);
  }
}

main();
