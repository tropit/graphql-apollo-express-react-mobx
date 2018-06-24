import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

import SuperHeroType from '../superhero/superhero.type'

export default new GraphQLObjectType({
  name: 'SuperPower',
  description: 'Super Power description',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: ({ id }) => id,
    },
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name,
    },
    rank: {
      type: GraphQLInt,
      resolve: ({ rank }) => rank,
    },
    owners: {
      type: new GraphQLList(SuperHeroType),
      resolve: ({ owners }, args, { loaders }) => loaders.SuperHeroLoader.getSuperHeroesByIds.loadMany(owners),
    },
  }),
})