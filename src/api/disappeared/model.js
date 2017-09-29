import mongoose, { Schema } from 'mongoose'

const disappearedSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bornAt: {
    type: Date,
    required: true
  },
  obs: {
    type: String
  },
  policeDocument: {
    type: String
  },
  status: {
    type: String,
    required: true
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
      bornAt: this.bornAt,
      obs: this.obs,
      policeDocument: this.policeDocument,
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
