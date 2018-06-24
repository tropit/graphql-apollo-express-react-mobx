import {
  GraphQLNonNull, GraphQLString, GraphQLInputObjectType, GraphQLInt,
  GraphQLObjectType, GraphQLBoolean
} from 'graphql'


const input = new GraphQLInputObjectType({
  name: 'deleteSuperHeroInput',
  fields: { id: { type: new GraphQLNonNull(GraphQLInt) } },
})

const output = new GraphQLObjectType({
  name: 'deleteSuperHeroOutput',
  fields: {
    status: { type: new GraphQLNonNull(GraphQLBoolean) },
    error: { type: GraphQLString },
  },
})

export const DeleteSuperHeroInputType = input
export const DeleteSuperHeroOutputType = output