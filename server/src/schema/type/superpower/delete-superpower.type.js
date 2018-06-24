import {
  GraphQLNonNull, GraphQLString, GraphQLInputObjectType,
  GraphQLInt, GraphQLObjectType, GraphQLBoolean
} from 'graphql'

const input = new GraphQLInputObjectType({
  name: 'deleteSuperPowerInput',
  fields: { id: { type: new GraphQLNonNull(GraphQLInt) } },
})

const output = new GraphQLObjectType({
  name: 'deleteSuperPowerOutput',
  fields: {
    status: { type: new GraphQLNonNull(GraphQLBoolean) },
    error: { type: GraphQLString },
  },
})

export const DeleteSuperPowerInputType = input
export const DeleteSuperPowerOutputType = output