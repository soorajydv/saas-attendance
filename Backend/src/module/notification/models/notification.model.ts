import { Schema, model } from 'mongoose';

enum NotificationType {
  Default,
  Account,
  Traffic,
  Incentive,
  Timer,
  Extra,
}
export interface INotification extends Document {
  title: string;
  image: string;
  type: number;
  description: string;
  role: 'D' | 'P';
  users?: string[];
  category: ['P' | 'I' | 'G'];
  deletedOn?: Date;
  deleteNotification(): Promise<boolean>;
}

const notificationSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    type: {
      type: Number,
      enum: NotificationType,
      default: NotificationType.Default,
    },
    description: { type: String, required: true },
    role: { type: String, enum: ['D', 'P'] },
    users: { type: [Schema.Types.ObjectId], ref: 'User', default: undefined },
    category: { type: String, enum: ['P', 'I', 'G'], required: true },
    deletedOn: { type: Date },
  },
  { timestamps: true }
);

notificationSchema.methods.deleteNotification =
  async function (): Promise<boolean> {
    this.deletedOn = new Date();
    await this.save();
    return true;
  };

export const Notification = model<INotification>(
  'Notification',
  notificationSchema
);
