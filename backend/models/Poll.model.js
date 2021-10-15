const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema(
  {
    pollName: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: [],
    },
  },
  { strict: false }
);

let Poll = mongoose.model("poll", PollSchema);
module.exports = Poll;
