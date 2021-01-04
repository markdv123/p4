const { Game, Schema } = require('mongoose')

module.exports = new Schema(
    {
        title: {
            type: String,
            required: true
          },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
    }
)