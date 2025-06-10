const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, enum: [1, 2, 3], required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "usuarios" }],
  },
  {
    collection: "courses",
  }
);
const Courses = mongoose.model("courses", courseSchema);
module.exports = Courses;
