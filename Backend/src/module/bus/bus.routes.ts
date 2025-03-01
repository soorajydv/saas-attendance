import express  from "express";
import BusController from "./bus.controller";
import { validateId } from "../../validators/id.validator";
import { queryValidator } from "../../validators/query.validator";
import { busValidator } from "./bus.validator";

const controller = new BusController();

const busRouter = express.Router();

busRouter.get('/',queryValidator,controller.getAll);
busRouter.get('/location',queryValidator,controller.getBusesLocation);
// busRouter.patch('/location',queryValidator,controller.updateBusesLocation);

busRouter.post('',busValidator,controller.createOne);
busRouter.get('/:id',[validateId('id','BusId')],controller.getOne);
busRouter.patch('/:id',[validateId('id','BusId'),busValidator],controller.updateOne);
busRouter.delete('/:id',[validateId('id','BusId')],controller.deleteOne);

export default busRouter;