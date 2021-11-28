const mongoose = require('mongoose');
const Schema = mongoose.schema;

const BlogSchema = new Schema({
    UserId: {
        type: String
    },
    Category: {
        type: String,
        enum: ["", "", "", ""]
    },
    Like: {
        type: Integer
    },

    Comment: {
        type: String
    }
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = {Blog};