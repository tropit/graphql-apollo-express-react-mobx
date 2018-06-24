import graphql from 'mobx-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
// import { action, observable } from 'mobx'

import config from '../config'
import introspectionQueryResultData from './fragmentTypes.json'

const URI = `//${config.api.url}`


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

export default class BaseApi {
  static _client = new ApolloClient({
    link: new HttpLink({ uri: URI }),
    cache: new InMemoryCache({
      fragmentMatcher
    }),
  })
  static get _config () {
    return { client: this._client/*, fetchPolicy: 'cache-and-network'*/ }
  }
  static _genQuery (query, variables) {
    return { ...this._config, query, variables }
  }
  static _fetch (query, variables) {
    return graphql(this._genQuery(query, variables))
    // const config = this._genQuery(query, variables)
    // const { client, onError, onFetch, ...opts } = config
    // query = client.watchQuery(opts)
    // const observableQuery = observable(query.currentResult())
    // query.subscribe({
    //   next: action((value) => {
    //     observableQuery.error = undefined
    //     observableQuery.loading = value.loading
    //     observableQuery.data = value.data
    //
    //     if (onFetch) onError(onFetch)
    //   }),
    //   error: action((error) => {
    //     observableQuery.error = error
    //     observableQuery.loading = false
    //     observableQuery.data = undefined
    //
    //     if (onError) onError(error)
    //   })
    // })
    // console.log('query:', observableQuery)
    // return observableQuery
  }
  static _mutate (mutation, variables, queries) {
    return this._client.mutate({
      mutation,
      variables,
      refetchQueries: queries.map((query) => ({ query })),
    })
  }
}