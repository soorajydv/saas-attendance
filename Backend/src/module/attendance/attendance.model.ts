import { model, Schema } from "mongoose";
import { IAttendance } from "./attendance.interface";

const attendanceSchema: Schema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date, default: Date.now },
});

export const Attendance = model<IAttendance>("Attendance", attendanceSchema);