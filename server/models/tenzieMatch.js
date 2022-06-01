import mongoose from 'mongoose'

const tenzieMatchScheme = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    }
  }
)

const TenzieMatch = mongoose.model('tenzieMatch', tenzieMatchScheme)

export default TenzieMatch;
