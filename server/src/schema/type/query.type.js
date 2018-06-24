import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql'

import { SuperHero as SuperHeroModel, SuperPower as SuperPowerModel } from '../../model/index'

import SuperHeroType from './superhero/superhero.type'
import SuperPowerType from './superpower/superpower.type'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'put some query',
  fields: () => ({
    superHeroByName: {
      type: new GraphQLList(SuperHeroType),
      args: { name: { type: GraphQLString } },
      resolve: (obj, args, { loaders }) => loaders.SuperHeroLoader.getSuperHerosByName.load(args.name),
    },
    superHeroById: {
      type: SuperHeroType,
      args: { id: { type: GraphQLInt } },
      resolve: (obj, args, { loaders }) => loaders.SuperHeroLoader.getSuperHerosByIds.load(args.id),
    },
    superHeroes: {
      type: new GraphQLList(SuperHeroType),
      args: { id: { type: GraphQLInt } },
      resolve: async () => SuperHeroModel.find(),
    },
    superPowers: {
      type: new GraphQLList(SuperPowerType),
      args: { id: { type: GraphQLInt } },
      resolve: async () => SuperPowerModel.find(),
    },
  }),
})