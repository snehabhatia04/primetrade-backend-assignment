const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/redis");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => res.send("API Running"));

app.listen(process.env.PORT, () =>
    console.log("Server running on port " + process.env.PORT)
);
