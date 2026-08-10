require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.query(
  "ALTER TABLE complaints ADD COLUMN Image_Path VARCHAR(500) NULL",
  (err) => {
    if (err) {
      if (err.code === "ER_DUP_FIELDNAME") {
        console.log("Image_Path column already exists — skipping.");
      } else {
        console.error("Migration failed:", err.message);
        process.exit(1);
      }
    } else {
      console.log("Image_Path column added successfully.");
    }
    db.end();
  }
);
