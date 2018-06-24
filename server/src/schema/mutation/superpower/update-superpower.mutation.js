import { GraphQLNonNull } from 'graphql'

import { SuperPower } from '../../../model/index'
import { UpdateSuperPowerInputType, UpdateSuperPowerOutputType } from '../../type/superpower/update-superpower.type'

import { removeUndefinedValues } from '../../../lib/util'

export default {
  name: 'updateSuperPower',
  type: UpdateSuperPowerOutputType,
  args: { input: { type: new GraphQLNonNull(UpdateSuperPowerInputType) } },
  resolve: async (obj, { input }) => {
    const { id, name, rank } = input
    const superPower = await SuperPower.findOne({ id })

    if (!superPower) {
      return { error: 'SUPERPOWER_DOES_NOT_EXISTS' }
    }
    await SuperPower.update({ id }, removeUndefinedValues({ name, rank }))
    return {
      id,
      error: null,
    }
  },
}