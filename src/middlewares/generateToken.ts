import jwt from 'jsonwebtoken';
import User from '~/models/userModel';

// Lấy secret từ biến môi trường .env
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

const generateToken = async (userId: string): Promise<string> => {
  try {
    // console.log('JWT_SECRET:', JWT_SECRET); 

    // Tìm user theo userId
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error("User not found");
    }

    // console.log('User found:', user);

    // Tạo token JWT
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // console.log('Token generated:', token);

    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Error generating token');
  }
};

export default generateToken;
