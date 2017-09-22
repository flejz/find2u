import mongoose, { Schema } from 'mongoose'

const disappearedSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  birth_date: {
    type: String
  },
  date: {
    type: String
  },
  obs: {
    type: String
  },
  status: {
    type: String
  }
}, {
  timestamps: true
})

disappearedSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      name: this.name,
      birth_date: this.birth_date,
      date: this.date,
      obs: this.obs,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Disappeared', disappearedSchema)

export const schema = model.schema
export default model
