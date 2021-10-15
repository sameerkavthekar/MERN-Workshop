const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

connectDB();

app.use("/api/polls", require("./routes/polls"));

app.listen(5000, () => console.log("Listening on Port 5000"));
