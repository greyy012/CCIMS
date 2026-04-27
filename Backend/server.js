const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/complaintRoutes"));
app.use("/api", require("./routes/staffRoutes"));
app.use("/api", require("./routes/adminRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/messageRoute"));


app.use("/api", complaintRoutes);


app.use("/api", authRoutes);
app.listen(5000, () => {
  console.log("Server running 🚀");
});