import { Types } from "mongoose"
import _Class from "../class/class.model"

export const getClassesByTeacherId = async(teacherId:string) => {
    const classes = _Class.aggregate([
        { $unwind: "$periods"},
        { $match: {"periods.teacherId": new Types.ObjectId(teacherId)} },
        {
            $project:{
                _id:0,
                name:1,
                section:1,
                period:"$periods.period",
                subject:"$periods.subject"
            }
        }
    ])
    return classes;
}