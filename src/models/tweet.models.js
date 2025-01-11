const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 280
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
});

// Method to check if the user is the author
tweetSchema.methods.isOwner = function(userId) {
    return this.author.equals(userId);
};

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;