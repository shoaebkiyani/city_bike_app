const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 5000;

const app = express();

// middleware / bodyparser / URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/trips", require("./routes/tripRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`));
