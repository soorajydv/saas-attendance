import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import QRCode from "qrcode";
// import moment from "moment";
import { sendBadRequest, sendSuccess } from "../../utils/responseUtil";

export const generateQR = async (req: AuthRequest, res: Response) => {
    try {
        const qrData = JSON.stringify({ studentId: req.userId, timestamp: new Date });
        const qrCode = await QRCode.toDataURL(qrData);
        return sendSuccess(res,"QRCode generated",qrCode);
    } catch (error) {
        return sendBadRequest(res,"Error generating QR code");
    }
};

// export const scanQR = async (req: AuthRequest, res: Response) => {
//     try {
//         const { id } = req.params;
//         const date = moment().format("YYYY-MM-DD");
//         const time = moment().format("HH:mm:ss");
//         const attendAt = date.concat(time);

//         // const attendance = new Attendance({ id, date: attendAt });
//         await attendance.save();

//         return sendSuccess(res,"Attendance recorded");
//     } catch (error) {
//         return sendBadRequest(res,"Error marking attendance");
//     }
// };
