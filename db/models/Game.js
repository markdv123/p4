const { Schema } = require('mongoose')

module.exports = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'categories'
            }
        ],
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'questions'
            }
        ]
    },
    { timestamps: true }
)