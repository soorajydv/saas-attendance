import { IBus } from "./IBus";
import { Bus } from "./bus.model";

export const createBus = async (data: Partial<IBus>) => Bus.create({ ...data });

export const getBusById = async (id: string, organizationId: string) =>
    Bus.findOne({ where: { id, organizationId } }).where('deletedAt').exists(false);

export const getBussesByOrganizationId = async (
    organizationId: string,
    skip: number,
    limit: number,
    sortBy: -1 | 1) =>
    Bus.find({ organizationId }).where('deletedAt').exists(false)
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: sortBy });

export const getBusesLocation = async(organizationId:string) => Bus.find({organizationId,isDeleted:false}).select('location');