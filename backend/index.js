const express = require("express");
const connectDB = require("./config/db");

app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

connectDB();

app.use("/api/users", require("./routes/users"));
app.use("/api/polls", require("./routes/polls"));

app.listen(5000, () => console.log("Listening on 5000!"));
