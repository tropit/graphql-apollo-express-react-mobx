import { GraphQLObjectType } from 'graphql'

import { AddSuperHero, UpdateSuperHero, DeleteSuperHero } from '../mutation/superhero'
import { AddSuperPower, UpdateSuperPower, DeleteSuperPower } from '../mutation/superpower'

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'mutate',
  fields: () => ({
    AddSuperHero,
    UpdateSuperHero,
    DeleteSuperHero,
    AddSuperPower,
    UpdateSuperPower,
    DeleteSuperPower,
  }),
})