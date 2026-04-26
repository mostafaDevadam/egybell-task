require("dotenv").config();
const express = require("express");
const cors = require("cors")
const path = require("path");
const app = express();

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const logRoutes = require("./routes/log.routes");
const { I18n } = require('i18n')

const i18n = new I18n({
  locales: ['en', 'ar'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: "en",
  objectNotation: true,
  register: global,
  api: {
    __: 't',
    __n: 'tn'
  }
})

app.use(i18n.init)
app.use(express.json());
app.use(cors())

// Optional: set locale manually (from header, query, etc.)
app.use((req, res, next) => {
  const lang = req.headers['Accept-Language'] || 'en'
  req.setLocale(lang)
  next()
})

app.use("/api/v1.1/auth", authRoutes);
app.use("/api/v1.1/users", userRoutes);
app.use("/api/v1.1/logs", logRoutes);

app.get("/api/v1.1", (req, res) => {
  res.json({
    statusCode: 200,
    message: req.t("main.api"),
    data: null
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});