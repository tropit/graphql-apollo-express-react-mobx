import { GraphQLNonNull } from 'graphql'

import { SuperHero } from '../../../model/index'
import { DeleteSuperHeroInputType, DeleteSuperHeroOutputType } from '../../type/superhero/delete-superhero.type'

export default {
  name: 'deleteSuperHero',
  type: DeleteSuperHeroOutputType,
  args: { input: { type: new GraphQLNonNull(DeleteSuperHeroInputType) } },
  resolve: async (obj, { input }) => {
    const { id } = input
    const status = await SuperHero.findOneAndRemove({ id })
    return {
      status: !!status,
      error: !status ? 'SUPER_HERO_DOES_NOT_EXISTS' : null,
    }
  },
}