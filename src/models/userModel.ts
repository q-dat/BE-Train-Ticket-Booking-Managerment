import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Định nghĩa enum cho các giá trị hợp lệ của role
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role?: UserRole;  // Sử dụng enum cho role
  profileImage?: string;
  bio?: string;
  profession?: string;
  createdAt?: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER }, // Sử dụng enum trong schema
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
userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;