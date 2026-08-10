const db = require("../db");
const { verifyPassword } = require("../utils/password");

const sendError = (res, status, message) =>
  res.status(status).json({ error: message });

const buildUser = (row, role, staffRole) => ({
  id: role === "student" ? row.PRN_ID : role === "admin" ? row.Admin_ID : row.Staff_ID,
  name: row.Name,
  role,
  ...(staffRole ? { staffRole } : {}),
  ...(role === "admin" ? { username: row.Username } : {}),
});

async function authenticate(table, idCol, identifier, password, role, staffRole) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${table} WHERE ${idCol}=?`, [identifier], async (err, result) => {
      if (err) return reject(err);
      if (!result?.length) return resolve(null);

      const row = result[0];
      const stored = row.Password;
      const valid = await verifyPassword(password, stored);
      if (!valid) return resolve(null);

      resolve(buildUser(row, role, staffRole));
    });
  });
}

exports.login = async (req, res) => {
  try {
    let { identifier, password, role } = req.body;
    identifier = identifier?.toString().trim();
    password = password?.toString().trim();
    role = role?.toLowerCase();

    if (!identifier || !password || !role) {
      return sendError(res, 400, "All fields are required");
    }

    let user = null;

    if (role === "student") {
      user = await authenticate("students", "PRN_ID", identifier, password, "student");
      if (!user) return sendError(res, 401, "Invalid student credentials");
    } else if (role === "staff") {
      user = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM staff_ WHERE Staff_ID=?", [identifier], async (err, result) => {
          if (err) return reject(err);
          if (!result?.length) return resolve(null);
          const row = result[0];
          const valid = await verifyPassword(password, row.Password);
          if (!valid) return resolve(null);
          resolve({
            id: row.Staff_ID,
            name: row.Name,
            role: "staff",
            staffRole: row.Role || "",
          });
        });
      });
      if (!user) return sendError(res, 401, "Invalid staff credentials");
    } else if (role === "admin") {
      user = await authenticate("admin_users", "Username", identifier, password, "admin");
      if (!user) return sendError(res, 401, "Invalid admin credentials");
    } else {
      return sendError(res, 400, "Invalid role");
    }

    return res.json({ user });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return sendError(res, 500, "Server error during login");
  }
};

exports.forgotPassword = (req, res) => {
  let { identifier, role } = req.body;
  identifier = identifier?.toString().trim();
  role = role?.toLowerCase();

  if (!identifier || !role) {
    return sendError(res, 400, "ID and role are required");
  }

  const config = {
    student: { table: "students", idCol: "PRN_ID" },
    staff: { table: "staff_", idCol: "Staff_ID" },
    admin: { table: "admin_users", idCol: "Username" },
  }[role];

  if (!config) return sendError(res, 400, "Invalid role");

  db.query(
    `SELECT ${config.idCol}, Name FROM ${config.table} WHERE ${config.idCol}=?`,
    [identifier],
    (err, result) => {
      if (err) return sendError(res, 500, "Database error");
      if (!result?.length) return sendError(res, 404, "No account found with this ID");
      res.json({
        message: "Account verified. You can set a new password.",
        name: result[0].Name,
      });
    }
  );
};

exports.resetPassword = (req, res) => {
  let { identifier, role, newPassword } = req.body;
  identifier = identifier?.toString().trim();
  newPassword = newPassword?.toString().trim();
  role = role?.toLowerCase();

  if (!identifier || !role || !newPassword) {
    return sendError(res, 400, "All fields are required");
  }
  if (newPassword.length < 6) {
    return sendError(res, 400, "Password must be at least 6 characters");
  }

  const config = {
    student: { table: "students", idCol: "PRN_ID" },
    staff: { table: "staff_", idCol: "Staff_ID" },
    admin: { table: "admin_users", idCol: "Username" },
  }[role];

  if (!config) return sendError(res, 400, "Invalid role");

  db.query(
    `UPDATE ${config.table} SET Password=? WHERE ${config.idCol}=?`,
    [newPassword, identifier],
    (err, result) => {
      if (err) return sendError(res, 500, "Database error");
      if (result.affectedRows === 0) return sendError(res, 404, "Account not found");
      res.json({ message: "Password updated successfully" });
    }
  );
};
