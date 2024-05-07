import mongoose, { Schema } from "mongoose";

const workSchema = new Schema(
    {
        title: String,
        column: String,
    },
    {
        timestamps: true,
    }
);

const WorkItem =
    mongoose.models.WorkItem || mongoose.model("WorkItem", workSchema);

export default WorkItem;
