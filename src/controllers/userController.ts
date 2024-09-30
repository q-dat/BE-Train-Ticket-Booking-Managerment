import { Request, Response } from 'express'
import User, { IUser } from '../models/userModel'
import generateToken from '../middlewares/auth/generateToken'
import { CustomRequest } from '~/types/auth'

// Đăng ký user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, phone, fullName, gender } = req.body

  try {
    const userExists = await User.findOne({
      $or: [{ email: email }, { phone: phone }, { username: username }]
    })
    if (userExists) {
      res.status(400).json({ message: 'Người dùng đã tồn tại' })
      return
    }

    const user = await User.create({
      username,
      email,
      password,
      phone,
      fullName,
      gender
    })

    if (user) {
      res.status(201).json({ message: 'Người dùng đã đăng ký thành công!' })
    } else {
      res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ' })
    }
  } catch (error) {
    console.error('Lỗi khi đăng ký người dùng', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

// Đăng nhập user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }]
    })
    if (!user) {
      res.status(404).json({ message: 'Người dùng không tìm thấy' })
      return
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      res.status(401).json({ message: 'Mật khẩu không khớp' })
      return
    }

    const token = await generateToken(user._id.toString())

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    res.status(200).json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        role: user.role,
        bio: user.bio,
        profession: user.profession
      }
    })
  } catch (error) {
    console.error('Lỗi khi đăng nhập người dùng', error)
    res.status(500).json({ message: 'Lỗi khi đăng nhập người dùng' })
  }
}

// Đăng xuất user
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token')
    res.status(200).json({ message: 'Đăng xuất thành công!' })
  } catch (error) {
    console.error('Không thể đăng xuất', error)
    res.status(500).json({ message: 'Lỗi khi đăng xuất' })
  }
}

// Cập nhật vai trò người dùng
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { role } = req.body

    const user = await User.findByIdAndUpdate(id, { role }, { new: true })

    if (!user) {
      res.status(404).json({ message: 'Người dùng không tìm thấy' })
      return
    }

    res.status(200).json({ message: 'Cập nhật vai trò người dùng thành công', user })
  } catch (error) {
    console.error('Lỗi khi cập nhật vai trò người dùng', error)
    res.status(500).json({ message: 'Lỗi khi cập nhật vai trò người dùng' })
  }
}

// Cập nhật thông tin người dùng
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId, fullName, username, profileImage, bio, profession } = req.body
    if (!userId) {
      return res.status(400).send({ message: 'ID người dùng là bắt buộc' })
    }
    const user = (await User.findById(userId)) as IUser | null
    if (!user) {
      return res.status(404).send({ message: 'Người dùng không tồn tại' })
    }

    if (fullName !== undefined) user.fullName = fullName
    if (username !== undefined) user.username = username
    if (profileImage !== undefined) user.profileImage = profileImage
    if (bio !== undefined) user.bio = bio
    if (profession !== undefined) user.profession = profession

    await user.save()
    res.status(200).send({
      message: 'Cập nhật hồ sơ thành công',
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Lỗi khi cập nhật hồ sơ người dùng', error)
    res.status(500).send({ message: 'Lỗi khi cập nhật hồ sơ người dùng' })
  }
}

// Thay đổi mật khẩu
export const changePassword = async (req: CustomRequest, res: Response) => {
  const userId = req.userId
  console.log(userId)
  const { oldPassword, newPassword } = req.body

  try {
    const user = await User.findById(userId)
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' })
    }

    const isMatch = await user.comparePassword(oldPassword)
    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu cũ không đúng' })
    }

    if (newPassword.length < 6) {
      res.status(400).json({ message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
      return
    }

    user.password = newPassword
    await user.save()

    return res.status(200).json({ message: 'Thay đổi mật khẩu thành công' })
  } catch (error) {
    return res.status(500).json({ message: 'Đã xảy ra lỗi', error })
  }
}
