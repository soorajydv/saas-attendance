import { Response } from "express"
import { createClass, getClassByClassAndSection, getClassById, getClassesByOrganizationId } from "./class.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { sendConflict, sendBadRequest, sendCreated, sendNotFound, sendFound, sendSuccess, sendForbidden } from "../../utils/responseUtil";
import { getUsersByIds } from "../user/user.service";

export const createOne = async (req: AuthRequest, res: Response) => {
    const organizationId = req.user?.organizationId.toString();
    const _class = await getClassByClassAndSection(req.body.name, req.body.section);
    if (_class) return sendConflict(res, "Class already exists");
    req.body.organizationId = organizationId;
    const newClass = await createClass(req.body);
    if (!newClass) return sendBadRequest(res, "Failed to create class");
    return sendCreated(res, 'Class created', newClass);
}

export const getOne = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const _class = await getClassById(id);
    if (!_class) return sendNotFound(res, "Class not found");
    return sendFound(res, 'Class found', _class);
}

export const updateOne = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { periods, name, section } = req.body;
    const teacherIds = periods.map((period: { teacherId?: string }) => period.teacherId).filter((id:string): id is string => !!id);
    if (teacherIds.length > 0) {
        const userIds = (await getUsersByIds(teacherIds)).map((user: { _id: any }) => user._id.toString());
        const missingTeachers = teacherIds.filter((teacherId:string) => !userIds.includes(teacherId));
        if (missingTeachers.length > 0) return sendNotFound(res, `Teachers not found: ${missingTeachers.join(', ')}`);
    }
    const _class = await getClassById(id);
    if (!_class) return sendNotFound(res, "Class not found");
    if (!req.user?.organizationId) return sendBadRequest(res, "Organization ID is missing in user data");
    Object.assign(_class, { name, section, periods, organizationId: req.user.organizationId.toString() });
    const saveClass = await _class.save();
    return sendSuccess(res, 'Class updated', saveClass);
};

export const deleteOne = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const _class = await getClassById(id);
    if (!_class) return sendNotFound(res, "Class not found");
    console.log(req.user?.organizationId.toString(),_class.organizationId.toString());
    if (!req.user || !req.user.organizationId) return sendBadRequest(res, "Organization ID is missing in user data");
    if (_class.organizationId.toString() !== req.user.organizationId.toString()) 
        return sendForbidden(res, " You don't have permission to delete this class");
    await _class.delete();
    return sendSuccess(res, 'Class deleted');
}

export const getAll = async (req: AuthRequest, res: Response) => {
    const { limit = 5, page = 1, sort = 'asc' } = req.query;
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;
    const sortOrder = sort === 'desc' ? -1 : 1;
    if (!req.user || !req.user.organizationId) return sendBadRequest(res, "Organization ID is missing in user data");
    const organizationId = req.user?.organizationId.toString();
    const classes = await getClassesByOrganizationId(organizationId,pageNumber,skip,sortOrder);
    if (classes.length == 0) return sendNotFound(res, "No classes found");
    return sendSuccess(res, 'Classes found', classes);
}