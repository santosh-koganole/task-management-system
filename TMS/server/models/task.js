import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: "normal",
      enum: ["normal", "low", "medium", "high"],
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in_progress", "completed"],
    },
    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "started",
            "in_progress",
            "bug",
            "completed",
            "commented",
          ],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        // by : {type: Schema.Types.ObjectId, ref:"User"}
        by: { type: String, ref: "User" },
      },
    ],

    subTasks: [{ title: String, date: Date, tag: String }],

    team: [{ type: Schema.Types.ObjectId, ref: "User" }],

    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
