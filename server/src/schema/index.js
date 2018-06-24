import { GraphQLSchema } from 'graphql'

import QueryType from './type/query.type'
import MutationType from './type/mutation.type'

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})