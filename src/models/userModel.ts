import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role?: string;
  profileImage?: string;
  bio?: string;
  profession?: string;
  createdAt?: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  profileImage: { type: String },
  bio: { type: String, maxlength: 200 },
  profession: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Middleware để hash mật khẩu trước khi lưu vào cơ sở dữ liệu
userSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error('An unknown error occurred while hashing the password'));
    }
  }
});

// Phương thức so sánh mật khẩu người dùng nhập vào (mật khẩu chưa được mã hóa) với mật khẩu đã được mã hóa (được lưu trong cơ sở dữ liệu)
userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
