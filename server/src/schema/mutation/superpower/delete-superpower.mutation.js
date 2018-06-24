import { GraphQLNonNull } from 'graphql'

import { SuperPower } from '../../../model/index'
import { DeleteSuperPowerInputType, DeleteSuperPowerOutputType } from '../../type/superpower/delete-superpower.type'

export default {
  name: 'deleteSuperPower',
  type: DeleteSuperPowerOutputType,
  args: { input: { type: new GraphQLNonNull(DeleteSuperPowerInputType) } },
  resolve: async (obj, { input }) => {
    const { id } = input
    const status = await SuperPower.findOneAndRemove({ id })
    return {
      status: !!status,
      error: !status ? 'DOES_NOT_EXISTS' : null,
    }
  },
}