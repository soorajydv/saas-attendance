import { AuthRequest } from "../../middlewares/auth.middleware";
import asyncHandler from "express-async-handler";
import { Response } from "express";
import { sendNotFound, sendSuccess } from "../../utils/responseUtil";
import { getStudentsByClassId } from "./student.service";
import { getClassById } from "../class/class.service";

class StudentController {
    getStudents = asyncHandler(async(req:AuthRequest,res:Response) => {
        const classId = req.params.id;
        const _class = await getClassById(classId);
        if(!_class) return sendNotFound(res,"Class not found");
        const students = await getStudentsByClassId(classId);
        return sendSuccess(res,'Students of given class found',students);
    })
}
const studentController = new StudentController();
export default studentController;