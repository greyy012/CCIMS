const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Import routes ONCE
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const staffRoutes = require("./routes/staffRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const messageRoute = require("./routes/messageRoute");

// ✅ Use routes ONCE
app.use("/api", authRoutes);
app.use("/api", complaintRoutes);
app.use("/api", staffRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", messageRoute);




app.listen(5000, () => {
  console.log("Server running 🚀");
});