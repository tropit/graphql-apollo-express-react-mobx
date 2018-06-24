import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import SuperPower from '../superpower/superpower.type'

const SuperHeroType = new GraphQLObjectType({
  name: 'SuperHero',
  description: 'Super Hero description',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: ({ _id }) => _id,
    },
    id: {
      type: GraphQLInt,
      resolve: ({ id }) => id,
    },
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name,
    },
    email: {
      type: GraphQLString,
      resolve: ({ email }) => email,
    },
    superPower: {
      type: SuperPower,
      resolve: ({ superPower }, args, { loaders }) => superPower ? loaders.SuperPowerLoader.getSuperPowersByIds.load(superPower) : null,
    },
  }),
})

export default SuperHeroType