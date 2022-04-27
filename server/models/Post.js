const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReplySchema = new Schema(
  {
    //set custom id to avoid confusion with parent comment_id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: true,
      minlength: 1
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const CommentSchema = new Schema(
  {
    //set custom id to avoid confusion with parent post_id
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => Types.ObjectId()
    },
    username: {
      type: String,
      required: true
    },
    commentBody: {
      type: String,
      minlength: 1
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

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
    comments: [CommentSchema]
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
