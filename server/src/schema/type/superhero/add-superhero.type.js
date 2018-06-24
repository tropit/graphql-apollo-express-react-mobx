import {
  GraphQLNonNull, GraphQLString, GraphQLInputObjectType,
  GraphQLInt, GraphQLObjectType
} from 'graphql'


const input = new GraphQLInputObjectType({
  name: 'addSuperHeroInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    superPower: { type: GraphQLInt },
  },
})

const output = new GraphQLObjectType({
  name: 'addSuperHeroOutput',
  fields: {
    id: { type: GraphQLInt },
    error: { type: GraphQLString },
  },
})

export const AddSuperHeroInputType = input
export const AddSuperHeroOutputType = output