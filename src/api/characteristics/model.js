import mongoose, { Schema } from 'mongoose'

const characteristicsSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  disappeared: {
    type: Schema.ObjectId,
    ref: 'Disappeared',
    required: true
  },
  reference_id: {
    type: String
  },
  type: {
    type: String
  },
  which: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true
})

characteristicsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      disappeared: this.disappeared.view(full),
      reference_id: this.reference_id,
      type: this.type,
      which: this.which,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Characteristics', characteristicsSchema)

export const schema = model.schema
export default model
