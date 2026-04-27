const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not configured" });
  }

  const authHeader = req.headers["authorization"];

  console.log("HEADER:", authHeader);

  if (!authHeader) {
    return res.status(403).json({ message: "Token required ❌" });
  }

  // ✅ define token FIRST
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  // ✅ then log
  console.log("TOKEN RECEIVED:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user ? decoded.user : decoded;

    if (!req.user.id || !req.user.role) {
      return res.status(401).json({ message: "Invalid token payload ❌" });
    }

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(401).json({ message: "Invalid token ❌" });
  }
};