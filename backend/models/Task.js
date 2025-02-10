const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "completed", "open"], default: "all" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "all" },
  dueDate: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});



module.exports = mongoose.model("Task", TaskSchema);
