import mongoose from 'mongoose'

import { orderedFor, removeUndefinedValues } from '../lib/util'

const Schema = new mongoose.Schema({
  id: { type: Number },
  name: {
    type: String,
    required: true,
  },
  email: { type: String },
  superPower: {
    ref: 'SuperPower',
    type: Number,
  },
})

Schema.statics.getSuperHeroesByName = async function (names) {
  names = names instanceof Array ? names : [ names ]
  const rows = await this.find({ name: { $in: names } })
  return orderedFor(rows.map((row) => row.toObject()), names, 'name', true)
}

Schema.statics.getSuperHeroById = async function (id) {
  const rows = await this.find({ id })
  return orderedFor(rows.map((row) => row.toObject()), id, 'id', true)
}

Schema.statics.getSuperHeroesByIds = async function (ids) {
  const rows = await this.find({ id: { $in: ids } })
  return orderedFor(rows.map((row) => row.toObject()), ids, 'id', true)
}

Schema.statics.getAll = async function () {
  const rows = await this.find()
  return orderedFor(rows.map((row) => row.toObject()), rows.map((row) => row.id), 'id', true)
}

Schema.statics.modify = async function (doc) {
  const { id } = doc
  const oldDoc = await this.findOneAndUpdate({ id }, removeUndefinedValues({ ...doc }), { upsert: false })
  await syncSuperPowerOwner(oldDoc, false)
  await syncSuperPowerOwner(doc)
  if (!oldDoc) {
    return {
      status: false,
      error: 'DOESNT_EXISTS',
    }
  }
  return {
    id,
    status: true,
  }
}

Schema.pre('save', async function (next) {
  this.id = Math.floor(Math.random() * 90000) + 10000
  await syncSuperPowerOwner(this)
  next()
})

Schema.post('findOneAndRemove',
  (removed) => mongoose.model('SuperPower').ejectOwnerFromIds(removed.superPower, [ removed.id ]))

async function syncSuperPowerOwner (item, link = true) {
  const SuperPowerModel = mongoose.model('SuperPower')
  const superPowerId = item.superPower
  if (superPowerId) {
    const method = link ? '$push' : '$pull'
    await SuperPowerModel.findOneAndUpdate({ id: superPowerId }, { [method]: { owners: item.id } })
  }
}

export default mongoose.model('SuperHero', Schema)