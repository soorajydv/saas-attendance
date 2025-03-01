import { Schema, model } from "mongoose";
import mongooseDelete from 'mongoose-delete';
import { IClass } from "./IClass";

const periodSchema = new Schema({
  period: { type: Number, required: true },
  subject: { type: String, required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: "User" },
}, { _id: false });

const classSchema: Schema = new Schema({
    name: { type: String, required: true },
    section: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: "Oranization" },
    periods: [periodSchema], 
    deletedAt: { type: Date },
},{timestamps: true});

classSchema.pre<IClass>("save", function (next) {
  const _class = this;
  if (_class.isModified("periods") && Array.isArray(_class.periods)) {
    _class.periods.forEach((period, index) => {
      if (!period.period) {
        period.period = index + 1;
      }
    });
  }
  next();
});

classSchema.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt: true 
});

const _Class = model<IClass>("Class", classSchema);

export default _Class;
