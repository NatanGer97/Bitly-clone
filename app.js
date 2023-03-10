var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const {redis, setIfNotExists} = require("./services/Redis.Service");

const {sequelize} = require("./Services/DB");





const authRouter = require("./routes/auth");
const verifyJWT = require("./middlewares/auth/VerifyJWT");

require("dotenv").config();

// swagger
const swaggerDocument = YAML.load("swagger.yaml");

var app = express();

// Connect to MongoDB
mongoose.connect("mongodb://mongodb:27017/bitly-nodejs");
const db = mongoose.connection;
db.on("error", () => console.log("connection error:"));
db.once("open", () => console.log("connected to database"));

// postgres
sequelize
  .sync({force: false})
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use(verifyJWT)
app.use("/users", usersRouter);
app.use("/urls", require("./routes/urls"));
app.use("/stats", require("./routes/statistics"));

// exceptions handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

module.exports = app;
