import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        trim: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    duration: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (v) => v.getTime(),
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        get: (v) => v.getTime(),
    },
    isPublished: {
        type: Boolean,
        default: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    });