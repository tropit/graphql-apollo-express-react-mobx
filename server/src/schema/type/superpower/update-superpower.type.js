import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from 'graphql'

const input = new GraphQLInputObjectType({
  name: 'updateSuperPowerInput',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    rank: { type: GraphQLInt },
  },
})

const output = new GraphQLObjectType({
  name: 'updateSuperPowerOutput',
  fields: {
    id: { type: GraphQLInt },
    error: { type: GraphQLString },
  },
})

export const UpdateSuperPowerInputType = input
export const UpdateSuperPowerOutputType = output