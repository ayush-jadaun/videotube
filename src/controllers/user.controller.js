import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js"; // Ensure you have deleteFromCloudinary implemented

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  if (
    !fullname?.trim() ||
    !email?.trim() ||
    !username?.trim() ||
    !password?.trim()
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar missing");
  }

  let avatar, coverImage;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    if (coverLocalPath) {
      coverImage = await uploadOnCloudinary(coverLocalPath);
    }

    const newUser = new User({
      fullname,
      email,
      username,
      password,
      avatar: avatar.url,
      coverImage: coverImage ? coverImage.url : null,
    });

    await newUser.save();

    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong registering a user");
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        avatar: newUser.avatar,
        coverImage: newUser.coverImage,
      },
    });
  } catch (error) {
    console.log("Error creating user", error);

    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }
    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }

    throw new ApiError(500, "User creation failed");
  }
});

export { registerUser };
