import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      // select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this as TUser;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isPasswordMatched = async function (
  userPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(userPassword, hashedPassword);
};

userSchema.statics.isBlocked = async function (id: string) {
  const user = await this.findById(id);
  if (user?.isBlocked) {
    return true;
  }
};

const User = mongoose.model<TUser, UserModel>('User', userSchema);
export default User;
