import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  gender?: string;
  role?: UserRole;
  profileImage?: string;
  bio?: string;
  profession?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /\d{10}/.test(v); // Regex để kiểm tra số điện thoại hợp lệ (10 số)
        },
        message: props => `${props.value} số điện thoại không hợp lệ!`
      }
    },
    fullName: { type: String, required: true },
    gender: { type: String, enum: Object.values(UserGender), required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    profileImage: { type: String },
    bio: { type: String, maxlength: 200 },
    profession: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Middleware để hash mật khẩu trước khi lưu vào cơ sở dữ liệu
userSchema.pre('save', async function (next) {
  const user = this as IUser;

  // Kiểm tra xem mật khẩu có được thay đổi không
  if (!user.isModified('password')) return next();

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error instanceof Error ? error : new Error('Đã xảy ra lỗi không xác định khi mã hóa mật khẩu'));
  }
});

// Phương thức so sánh mật khẩu người dùng nhập vào (mật khẩu chưa được mã hóa) với mật khẩu đã được mã hóa (được lưu trong cơ sở dữ liệu)
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Lỗi khi so sánh mật khẩu');
  }
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
