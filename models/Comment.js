const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    // UserId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: "images/animals/female-lion"
    }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
