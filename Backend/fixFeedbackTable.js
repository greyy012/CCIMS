require("dotenv").config();
const db = require("./db");

function query(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => (err ? reject(err) : resolve(result)));
  });
}

async function main() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS student_feedback (
        Feedback_ID INT AUTO_INCREMENT PRIMARY KEY,
        PRN_ID INT NOT NULL,
        Complaint_ID INT NULL,
        Rating INT NOT NULL,
        Message TEXT,
        Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_feedback_prn (PRN_ID),
        INDEX idx_feedback_complaint (Complaint_ID)
      ) ENGINE=InnoDB
    `);
    console.log("student_feedback table is ready");
    process.exit(0);
  } catch (err) {
    console.error("Fix failed:", err.message);
    process.exit(1);
  }
}

main();
