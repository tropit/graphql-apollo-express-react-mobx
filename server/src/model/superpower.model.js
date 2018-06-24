import mongoose from 'mongoose'
import { orderedFor } from '../lib/util'

const Schema = new mongoose.Schema({
  id: { type: Number },
  name: {
    type: String,
    required: true,
  },
  rank: { type: Number },
  owners: [ {
    type: Number,
    ref: 'SuperHero',
  } ],
})
Schema.methods.ejectOwner = function (ownerId) {
  return this.model('SuperPower').update({ id: this.id }, { $pull: { owners: ownerId } })
}
Schema.methods.injectOwner = function (ownerId) {
  return this.model('SuperPower').update({ id: this.id }, { $push: { owners: ownerId } })
}
Schema.statics.ejectOwnerFromIds = function (superPowerId, ids) {
  return this.update({ id: superPowerId }, { $pullAll: { owners: ids } })
}
Schema.statics.getSuperPowersByIds = async function (ids) {
  const rows = await this.find({ id: { $in: ids } })
  return orderedFor(rows.map((row) => row.toObject()), ids, 'id', true)
}
Schema.pre('save', function (next) {
  this.id = Math.floor(Math.random() * 90000) + 10000
  next()
})
Schema.post('findOneAndRemove', (removed) => {
  if (!removed) return
  return mongoose.model('SuperHero').update({ id: { $in: removed.owners.map((id) => id) } }, { superPower: null })
})

export default mongoose.model('SuperPower', Schema)