import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
