const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new mongoose.Schema({
    title:{type: String,required:true},
    body: {type: String,required:true},
    image: {type: String,required:true},
    user: { type: Schema.Types.ObjectId, ref: "users" }
})

const Posts = mongoose.model('posts', postsSchema);

module.exports = Posts;