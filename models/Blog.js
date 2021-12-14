const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    UserId: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "other"
    },
    username: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: "images/animals/female-lion.svg"
    },
    likes: {
        type: Number,
        default: 0
    },

    // Comment: {
    //     type: String,
    //     default: ""
    // }
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;