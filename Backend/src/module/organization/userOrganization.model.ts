import { model, Schema } from 'mongoose';
import { UserRole } from '../../models/enums';
import mongooseDelete from 'mongoose-delete';

const userOrganizationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STUDENT,
    },
  },
  { timestamps: true }
);

userOrganizationSchema.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt: true 
});

const UserOrganization = model('UserOrganization', userOrganizationSchema);
export default UserOrganization;
