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
  disappearance_date: {
    type: String
  },
  mobile_contact: {
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
      disappearance_date: this.disappearance_date,
      mobile_contact: this.mobile_contact,
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
