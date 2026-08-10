require("dotenv").config();
const db = require("./db");

db.query(
  `CREATE TABLE IF NOT EXISTS admin_users (
    Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Name VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error("Create table:", err.message);
      process.exit(1);
    }
    db.query(
      "INSERT IGNORE INTO admin_users (Username, Name, Password) VALUES (?, ?, ?)",
      ["admin", "System Administrator", "admin123"],
      (err2, result) => {
        if (err2) {
          console.error("Insert:", err2.message);
          process.exit(1);
        }
        console.log("Admin ready. Login: admin / admin123");
        process.exit(0);
      }
    );
  }
);
