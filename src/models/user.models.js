import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please fill a valid email address",
      ],
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required:true,
      
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length
    },
    refreshToken: {
      type: String,
      default: null, // Can be null initially
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video", // Reference to the Video model
      },
    ],
  },
  {
    timestamps: true,
  }
);



export const User = mongoose.model("User", userSchema);
