import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    if (!fullName?.trim() || !email?.trim() || !username?.trim() || !password?.trim()) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files ? req.files.avatar[0]?.path : null;
    const coverLocalPath = req.files ? req.files.coverImage[0]?.path : null;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar missing");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverLocalPath ? await uploadOnCloudinary(coverLocalPath) : null;

     const newUser = new User({
        fullName,
        email,
        username,
        password,
        avatar: avatar.url,
        coverImage: coverImage ? coverImage.url : null
    });

    const createdUser=await User.findById(newUser._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"something went wrong registering a user")
    }


    await newUser.save();

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            username: newUser.username,
            avatar: newUser.avatar,
            coverImage: newUser.coverImage
        }
    });
});

export { registerUser };