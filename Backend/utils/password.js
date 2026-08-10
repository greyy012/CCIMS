const bcrypt = require("bcrypt");

const isBcryptHash = (value) =>
  typeof value === "string" && /^\$2[aby]\$\d{2}\$/.test(value);

async function verifyPassword(plain, stored) {
  if (!stored) return false;
  if (isBcryptHash(stored)) {
    return bcrypt.compare(plain, stored);
  }
  return plain === stored;
}

module.exports = { verifyPassword, isBcryptHash };
