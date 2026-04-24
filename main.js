require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const logRoutes = require("./routes/log.routes");


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/logs", logRoutes);

app.get("/api", (req,res) => {
   
  res.json({
    statusCode: 200,
    message: "API is working",
    data: null
  })
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});