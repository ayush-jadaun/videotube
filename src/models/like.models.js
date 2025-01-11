const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tweet: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;