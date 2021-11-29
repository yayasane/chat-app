import { Schema, model } from 'mongoose'
const messageSchema = Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

const Message = model('Message', messageSchema)
export { Message }
