import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { sendBadRequest, sendSuccess } from "../../utils/responseUtil";
import { getUserById } from "../user/user.service";
import { getAttendanceSummary, getStudentsPresentTodayByTeacherId, toggleAttendance, validatePeriodOfATeacher } from "./attendance.service";
import { AttendanceStatus } from "../../models/enums";

export const markAttendance = async (req: AuthRequest, res: Response) => {
    const { studentId, period } = req.body;
    const ids = [studentId, req.userId];
    let users = [];

    // Fetch users (both teacher and student) by their IDs
    for (let i = 0; i < ids.length; i++) {
        users.push(await getUserById(ids[i]));
    }

    // Extract the organizationIds from both teacher and student
    const [student, teacher] = users;
    const studentOrganizationId = student?.organizationId;
    const teacherOrganizationId = teacher?.organizationId;

    // Check if both the teacher and student have the same organizationId
    if (!studentOrganizationId || !teacherOrganizationId || studentOrganizationId.toString() !== teacherOrganizationId.toString()) {
        return sendBadRequest(res, "Teacher and Student do not belong to the same organization.");
    }

    // Validate the period for the authenticated teacher
    const isValidPeriod = await validatePeriodOfATeacher(period, req.userId);
    if (!isValidPeriod) {
        return sendBadRequest(res, "Invalid Period or Teacher is not assigned to this period.");
    }

    // Toggle the student's attendance for the given period
    const attendanceStatus = await toggleAttendance(studentId, period);
    if (attendanceStatus === null) {
        return sendBadRequest(res, "Unable to mark attendance for this student.");
    }

    return sendSuccess(res, "Attendance marked successfully");
};

// get students present today
export const getPresentStudents = async (req: AuthRequest, res: Response) => {
    const data = await getStudentsPresentTodayByTeacherId(req.userId);
    const studentIds = [...new Set(data.map(student => student.studentId!))];
    const students = await Promise.all(studentIds.map(studentId => getUserById(studentId)));
    return sendSuccess(res, "Students present today", students.length);
}

// get attendance history of a student
export const getAttendanceHistory = async (req: AuthRequest, res: Response) => {
    const { studentId } = req.params;
    const {
      range = 'month',
      referenceDate = new Date().toISOString(),
      status,
      period,
    } = req.query;
  
    const allowedRanges = ['day', 'week', 'month'];
    if (!allowedRanges.includes(String(range))) {
      return sendBadRequest(res,'Invalid range. Use day, week, or month.');
    }
  
    if (status && !Object.values(AttendanceStatus).includes(status as AttendanceStatus)) {
      return sendBadRequest(res,'Invalid status filter.');
    }
  
    const attendance = await getAttendanceSummary(
      studentId,
      range as 'day' | 'week' | 'month',
      referenceDate as string,
      status as AttendanceStatus | undefined,
      period ? Number(period) : undefined 
    );
  
    return sendSuccess(res, "Attendance history fetched", attendance);
  };