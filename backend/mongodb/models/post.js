import mongoose from 'mongoose'

const Post = mongoose.Schema({
  prompt: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

})

const PostSchema = mongoose.model('Post', Post)

export default PostSchema
