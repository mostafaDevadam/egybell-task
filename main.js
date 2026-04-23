require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});