import { GraphQLNonNull } from 'graphql'

import { SuperHero } from '../../../model/index'
import { UpdateSuperHeroInputType, UpdateSuperHeroOutputType } from '../../type/superhero/update-superhero.type'

export default {
  name: 'updateSuperHero',
  type: UpdateSuperHeroOutputType,
  args: { input: { type: new GraphQLNonNull(UpdateSuperHeroInputType) } },
  resolve: async (obj, { input }) => {
    const result = await SuperHero.modify({ ...input })
    return {
      id: result.id,
      error: result.error || null,
    }
  },
}