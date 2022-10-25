const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  profile: {
    type: mongoose.Schema.ObjectId,
    ref: "Profile",
    required: true
  },
  createdBy: {
    name: String,
    image: String
  },
  createdAt: {
    type: String
  },
  post: {
    paragraph: String,
    image: String
  },
  messages: [
    {
      tag: String,
      entry: String
    }
  ],
  likes: [
    {
      type: String
    }
  ]
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
