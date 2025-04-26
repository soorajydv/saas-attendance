import { Types } from 'mongoose';
import { AttendanceStatus } from "../../models/enums";
import User from "../../models/users";

export const getStudentsByClassId = async (classId: string) => {
    const studentsWithAttendance = await User.aggregate([
        {
          $match: { classId: new Types.ObjectId(classId), role: 'STUDENT', deleted: false },  // Match students by classId, role, and deleted flag
        },
        {
          $lookup: {
            from: 'studentattendances',
            localField: '_id',
            foreignField: 'studentId',
            as: 'attendanceRecords',  // Join and create an array of attendance records
          },
        },
        {
          $unwind: {
            path: '$attendanceRecords',
            preserveNullAndEmptyArrays: true,  // Keep users even if no attendance record exists
          },
        },
        {
          $project: {
            _id: 1,
            fullName: 1,
            email: 1,
            dateOfBirth: 1,
            gender: 1,
            phoneNumber: 1,
            crn: 1,
            isPresent: {
              $cond: {
                if: { $eq: ['$attendanceRecords.status', AttendanceStatus.PRESENT] },
                then: true,
                else: false,
              },
            },
          },
        },
      ]);
  
      return studentsWithAttendance;
  };