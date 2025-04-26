import _Class from "../class/class.model"
import { Types } from 'mongoose';
import StudentAttendance from "./attendance.model";
import { AttendanceStatus } from "../../models/enums";

export const validatePeriodOfATeacher = async (period: number, teacherId: string) => {
    const result = await _Class.findOne({
        periods: {
            $elemMatch: { period, teacherId: new Types.ObjectId(teacherId) }
        }
    });

    return result !== null;
};

export const toggleAttendance = async (studentId: string, period: number) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Set to 00:00:00

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Set to 23:59:59

    const attendance = await StudentAttendance.findOne({
        studentId,
        period,
        createdAt: { $gte: startOfDay, $lt: endOfDay },
    });

    if (attendance) {
        attendance.status = attendance.status === AttendanceStatus.PRESENT ? AttendanceStatus.ABSENT : AttendanceStatus.PRESENT;
        await attendance.save();
    } else {
        await StudentAttendance.create({
            studentId,
            period,
            status: AttendanceStatus.PRESENT,
        });
    }

    return true;
};

export const getStudentsPresentTodayByTeacherId = async (teacherId: string) => {

    const classes = await _Class.find(
        { "periods.teacherId": new Types.ObjectId(teacherId) },
        { "periods.$": 1 }
    );

    const periods = classes.flatMap(cls => cls.periods.map(period => period.period));

    if (periods.length === 0) return []; 

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const studentsPresent = await StudentAttendance.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
        period: { $in: periods },
        status: AttendanceStatus.PRESENT
    });

    return studentsPresent;
};

export const getAttendanceSummary = async (
    studentId: string,
    range: 'day' | 'week' | 'month',
    referenceDate: string,
    status?: AttendanceStatus,
    period?: number
  ) => {
    const ref = new Date(referenceDate);
    let start: Date;
    let end: Date;
  
    switch (range) {
      case 'day':
        start = new Date(ref.setHours(0, 0, 0, 0));
        end = new Date(start);
        end.setDate(end.getDate() + 1);
        break;
      case 'week':
        const day = ref.getDay();
        start = new Date(ref);
        start.setDate(ref.getDate() - day);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setDate(start.getDate() + 7);
        break;
      case 'month':
        start = new Date(ref.getFullYear(), ref.getMonth(), 1);
        end = new Date(ref.getFullYear(), ref.getMonth() + 1, 1);
        break;
      default:
        throw new Error('Invalid range');
    }
  
    const match: any = {
      studentId: new Types.ObjectId(studentId),
      createdAt: { $gte: start, $lt: end },
    };
  
    if (status) match.status = status;
    if (typeof period === 'number') match.period = period;
  
    return await StudentAttendance.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          },
          statuses: { $addToSet: '$status' },
          periods: { $push: '$period' },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id.date',
          statuses: 1,
          periods: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);
  };