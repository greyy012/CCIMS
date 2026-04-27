require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const statements = [
  "ALTER TABLE complaints DROP FOREIGN KEY complaints_ibfk_1",
  "ALTER TABLE complaints DROP FOREIGN KEY complaints_ibfk_2",
  "ALTER TABLE complaints DROP FOREIGN KEY complaints_ibfk_3",
  "ALTER TABLE complaints ADD CONSTRAINT complaints_fk_student FOREIGN KEY (PRN_ID) REFERENCES students(PRN_ID) ON DELETE SET NULL ON UPDATE CASCADE",
  "ALTER TABLE complaints ADD CONSTRAINT complaints_fk_staff FOREIGN KEY (Staff_ID) REFERENCES staff_(Staff_ID) ON DELETE SET NULL ON UPDATE CASCADE",
  "ALTER TABLE complaints ADD CONSTRAINT complaints_fk_category FOREIGN KEY (Category_ID) REFERENCES category(Category_ID) ON DELETE SET NULL ON UPDATE CASCADE"
];

function run(index = 0) {
  if (index >= statements.length) {
    console.log("Complaint foreign keys fixed successfully.");
    db.end();
    return;
  }

  const sql = statements[index];
  db.query(sql, (err) => {
    if (err) {
      console.error("Migration failed on:", sql);
      console.error(err.message);
      db.end();
      process.exit(1);
    }

    console.log("Executed:", sql);
    run(index + 1);
  });
}

run();
