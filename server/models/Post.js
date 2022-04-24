const { Schema, model } = require('mongoose');
// const commentSchema = require('');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    itemTitle: {
      type: String,
      required: 'Enter a Title'
    },
    itemDescription: {
      type: String,
      required: 'Please Describe the Item',
      minlength: 1,
      maxlength: 280
    },
    imageURL: {
      type: String
    },
    itemCategory: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    // comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

postSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Post = model('Post', postSchema);

module.exports = Post;
