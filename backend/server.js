const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

const app = express();

// middleware / bodyparser / URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/trips", require("./routes/tripRoutes"));

app.use(errorHandler);

connectDB()
  .then(() =>
    app.listen(port, () =>
      console.log(`Server started on port ${port}`.cyan.underline)
    )
  )
  .catch((error) => console.log(error));
