import { GraphQLNonNull } from 'graphql'

import { SuperPower } from '../../../model/index'
import { AddSuperPowerInputType, AddSuperPowerOutputType } from '../../type/superpower/add-superpower.type'

export default {
  name: 'addSuperPower',
  type: AddSuperPowerOutputType,
  args: { input: { type: new GraphQLNonNull(AddSuperPowerInputType) } },
  resolve: async (obj, { input }) => {
    const { name, rank } = input
    let doc = await SuperPower.findOne({ name })

    if (doc) {
      return { error: 'SUPERPOWER_ALREADY_EXISTS' }
    }
    doc = new SuperPower({
      name,
      rank,
    })
    const { id } = await doc.save()
    return {
      id,
      error: null,
    }
  },
}