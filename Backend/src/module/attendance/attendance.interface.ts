import { AttendanceStatus } from "../../models/enums";

export interface IAttendance {
    studentId: string;
    period: number;
    date: Date;
    status: AttendanceStatus; 
    createdAt?: Date;
    updatedAt?: Date;
  }