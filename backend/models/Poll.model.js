const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema(
  {
    questionNumber: {
      type: Number,
      required: true,
    },
    pollName: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      default: [],
    },
  },
  { strict: false }
);

let Poll = mongoose.model("poll", PollSchema);
module.exports = Poll;
