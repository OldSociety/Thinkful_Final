const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

//Routers
app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);
// app.use("/search", searchRouter);

//Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
