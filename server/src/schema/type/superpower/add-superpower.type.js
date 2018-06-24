import {
  GraphQLNonNull, GraphQLString, GraphQLInputObjectType,
  GraphQLInt, GraphQLObjectType
} from 'graphql'


const input = new GraphQLInputObjectType({
  name: 'addSuperPowerInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    rank: { type: new GraphQLNonNull(GraphQLInt) },
  },
})

const output = new GraphQLObjectType({
  name: 'addSuperPowerOutput',
  fields: {
    id: { type: GraphQLInt },
    error: { type: GraphQLString },
  },
})

export const AddSuperPowerInputType = input
export const AddSuperPowerOutputType = output