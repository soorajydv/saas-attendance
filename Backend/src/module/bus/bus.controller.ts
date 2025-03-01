
import { Response } from "express";
import { createBus, getBusById, getBusesLocation, getBussesByOrganizationId } from "./bus.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { sendBadRequest, sendCreated, sendNotFound, sendFound, sendSuccess } from "../../utils/responseUtil";

class BusController {
    createOne = async (req: AuthRequest, res: Response) => {
        const organizationId = req.organizationId;
        const { ...data } = req.body;
        data.organizationId = organizationId;
        const bus = await createBus(data);
        if (!bus) return sendBadRequest(res, 'Failed to create bus');
        return sendCreated(res, 'Bus created', bus);
    }

    getOne = async (req: AuthRequest, res: Response) => {
        const busId = req.params.id;
        const bus = await getBusById(busId, req.organizationId);
        if (!bus) return sendNotFound(res, 'Bus not found');
        return sendFound(res, `Bus found`, bus);
    }

    updateOne = async (req: AuthRequest, res: Response) => {
        const busId = req.params.id;
        const { ...data } = req.body;
        const bus = await getBusById(busId, req.organizationId);
        if (!bus) return sendNotFound(res, 'Bus not found');
        Object.assign(bus, data); // Update only the provided fields
        await bus.save();
        return sendSuccess(res, 'Bus updated', bus);
    }

    deleteOne = async (req: AuthRequest, res: Response) => {
        const busId = req.params.id;
        const bus = await getBusById(busId, req.organizationId);
        if (!bus) return sendNotFound(res, 'Bus not found');
        await bus.delete();
        return sendSuccess(res, 'Bus deleted');
    }

    getAll = async( req: AuthRequest, res: Response ) => {
        const { limit = 5, page = 1, sort = 'asc' } = req.query;
        const pageNumber = Number(page);
        const pageSize = Number(limit);
        const skip = (pageNumber - 1) * pageSize;
        const sortOrder = sort === 'desc' ? -1 : 1;
        if (!req.user || !req.user.organizationId) return sendBadRequest(res, "Organization ID is missing in user data");
        const organizationId = req.user?.organizationId.toString();
        const buses = await getBussesByOrganizationId(organizationId,pageSize,skip,sortOrder);
        if(buses.length == 0) return sendNotFound(res, 'No buses found');
    }

    getBusesLocation = async (req: AuthRequest, res: Response) => {
        const locations = await getBusesLocation(req.organizationId);
        return sendSuccess(res,"Location fetched",locations);
    }

    // updateBusLocation
}

export default BusController;