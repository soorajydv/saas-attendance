import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { Attendance } from "./attendance.model";
import { sendSuccess } from "../../utils/responseUtil";

export const markAttendance = async (req:AuthRequest, res:Response) => {
    const { userId, timestamp } = req.body;
    if (!userId && !timestamp) return res.status(400).json({ message: "No userId & timestamp provided" });

    const isValid = await Attendance.findOne({ userId,timestamp });
    if (isValid) return res.status(400).json({ message: "Already attended" });

    // Mark attendance
    if(!isValid){
        new Attendance({ userId, timestamp }).save();
    }

    return sendSuccess(res,"Attendance marked successfully");
};