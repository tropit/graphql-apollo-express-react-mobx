import {
  GraphQLNonNull, GraphQLString, GraphQLInputObjectType,
  GraphQLInt, GraphQLObjectType,
} from 'graphql'


const input = new GraphQLInputObjectType({
  name: 'updateSuperHeroInput',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    superPower: { type: GraphQLInt },
  },
})

const output = new GraphQLObjectType({
  name: 'updateSuperHeroOutput',
  fields: {
    id: { type: GraphQLInt },
    error: { type: GraphQLString },
  },
})

export const UpdateSuperHeroInputType = input
export const UpdateSuperHeroOutputType = output