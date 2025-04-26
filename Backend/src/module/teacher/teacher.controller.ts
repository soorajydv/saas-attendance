import { Response } from 'express';
import  asyncHandler  from 'express-async-handler';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { getClassesByTeacherId } from './teacher.service';
import { sendNotFound, sendSuccess } from '../../utils/responseUtil';

class TeacherController {
    getClassesByTeacherId = asyncHandler(async(req:AuthRequest,res:Response) => {
        const teacherId = req.userId;
        const data = await getClassesByTeacherId(teacherId);
        if(!data || data.length == 0) return sendNotFound(res,"No classes of given teacherId found");
        return sendSuccess(res,"Class details found",data);
    })
}

export const teacherController = new TeacherController();