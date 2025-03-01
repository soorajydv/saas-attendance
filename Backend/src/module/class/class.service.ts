import { IClass } from "./IClass";
import _Class from "./class.model";

// Get class by ID, ensuring that deletedAt does not exist
export const getClassById = async (id: string) => 
    _Class.findById(id).where('deletedAt').exists(false);

// Get class by name and section, ensuring that deletedAt does not exist
export const getClassByClassAndSection = async (name: string, section: string) => 
    _Class.findOne({ name, section }).where('deletedAt').exists(false);

// Create a new class
export const createClass = async (data: IClass) => {
    const result = _Class.create({ ...data });
    return result;
}

// Get classes by organization ID ensuring that deletedAt does not exist
export const getClassesByOrganizationId = async (
    organizationId: string,
    pageNumber: number,
    pageSize: number,
    sortOrder: -1 | 1
) => {
    // Query the _Class collection, applying the organizationId filter, pagination, and sorting
    return _Class.find({ organizationId })
        .skip((pageNumber - 1) * pageSize) // Skip the records for pagination
        .limit(pageSize) // Limit the number of records returned
        .sort({ createdAt: sortOrder }); // Sort by createdAt field in either ascending (1) or descending (-1) order
};
