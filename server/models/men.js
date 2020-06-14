const {Schema, model} = require('mongoose')

const menSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  friends: [
    {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Men',
        required: true,
      },
    },
  ],
})

module.exports = model('Men', menSchema)
