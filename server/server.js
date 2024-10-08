const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const ColumnRoute = require("./src/routes/Column.route");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.use("/api/columns", ColumnRoute);
// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error(err));
