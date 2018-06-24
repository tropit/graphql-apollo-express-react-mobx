import { GraphQLNonNull } from 'graphql'

import { SuperHero } from '../../../model/index'
import { AddSuperHeroInputType, AddSuperHeroOutputType } from '../../type/superhero/add-superhero.type'

export default {
  name: 'addSuperHero',
  type: AddSuperHeroOutputType,
  args: { input: { type: new GraphQLNonNull(AddSuperHeroInputType) } },
  resolve: async (obj, { input }) => {
    const { name, email, superPower } = input
    let superHero = await SuperHero.findOne({ name })

    if (superHero) {
      return { error: 'SUPER_HERO_ALREADY_EXISTS' }
    }
    superHero = new SuperHero({
      name,
      email,
      superPower,
    })
    const { id } = await superHero.save()
    return {
      id,
      error: null,
    }
  },
}