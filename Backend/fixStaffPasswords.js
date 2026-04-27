require("dotenv").config();
const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const DEFAULT_PASSWORD = "Password@123";
const PLACEHOLDER = "$2b$10$HASH";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

async function run() {
  try {
    const hashed = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    db.query(
      "UPDATE students SET Password=? WHERE Password=?",
      [hashed, PLACEHOLDER],
      (studentErr, studentResult) => {
        if (studentErr) {
          console.error("students update failed:", studentErr.message);
          db.end();
          process.exit(1);
        }

        db.query(
          "UPDATE staff_ SET Password=? WHERE Password=?",
          [hashed, PLACEHOLDER],
          (staffErr, staffResult) => {
            if (staffErr) {
              console.error("staff_ update failed:", staffErr.message);
              db.end();
              process.exit(1);
            }

            console.log("Password fix complete");
            console.log("students rows updated:", studentResult.affectedRows);
            console.log("staff rows updated:", staffResult.affectedRows);
            console.log("Default password set to:", DEFAULT_PASSWORD);
            db.end();
          }
        );
      }
    );
  } catch (error) {
    console.error("Password fix failed:", error.message);
    db.end();
    process.exit(1);
  }
}

run();
