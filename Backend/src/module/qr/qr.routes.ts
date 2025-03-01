import express from 'express'
import { authorize } from '../../middlewares/auth.middleware';
import { UserRole } from '../../models/enums';
import { generateQR, scanQR } from './qr.controller';
const qrRouter = express.Router();

qrRouter.get("/generate", generateQR);
qrRouter.post("/scan", authorize(UserRole.STUDENT), scanQR);

export default qrRouter;