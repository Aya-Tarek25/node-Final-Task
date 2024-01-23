const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  photo: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);
Blog.createIndexes({ title: 1 });
Blog.createIndexes({ author: 1 });
Blog.createIndexes({ tags: 1 });
module.exports = Blog;
