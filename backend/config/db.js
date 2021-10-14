const mongoose = require("mongoose");

const db = "mongodb://localhost/polling";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "polling",
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("ERROR WHILE CONNECTING TO DB: " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
